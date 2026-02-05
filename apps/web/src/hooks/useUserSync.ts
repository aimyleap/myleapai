"use client";

import { useEffect } from "react";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";
import { supabase } from "@/lib/supabase";

export function useUserSync() {
    const account = useActiveAccount();
    const wallet = useActiveWallet();

    useEffect(() => {
        async function syncUser() {
            if (!account?.address || !wallet) return;

            const chainId = wallet.getChain()?.id;
            const isSmart = !!account.admin;
            const smartAddress = account.address.toLowerCase();
            const signerAddress = account.admin?.address?.toLowerCase() || smartAddress;

            // La identidad "oficial" es siempre la Smart Wallet si existe, sino el Signer.
            const mainWalletAddress = smartAddress;
            const walletId = wallet.id;

            // Intentar obtener email (muy importante para el usuario)
            let email = null;
            try {
                // @ts-ignore - Intentamos obtener de múltiples posibles fuentes en el objeto wallet/account
                const walletAccount = wallet.getAccount();
                // @ts-ignore
                email = walletAccount?.email ||
                    // @ts-ignore
                    walletAccount?.profile?.email ||
                    // @ts-ignore
                    wallet?.getAccount()?.email ||
                    null;

                // Log para debug de la estructura real si el email falla
                if (!email) {
                    console.log("⚠️ No se detectó email en el objeto walletAccount:", walletAccount);
                }
            } catch (e) {
                console.error("❌ Error al intentar extraer email:", e);
            }

            console.log("🔍 DIAGNÓSTICO DE IDENTIDAD ACTUALIZADO:");
            console.log(" > Dirección SDK (Smart Wallet):", mainWalletAddress);
            console.log(" > Dirección Signer (EOA Admin):", signerAddress);
            console.log(" > ¿Es Smart Wallet?:", isSmart ? "SÍ ✅" : "NO ❌");
            console.log(" > Email Detectado:", email || "NINGUNO ⚠️");
            console.log(" > Provider:", walletId);

            // 1. BUSCAR O CREAR USUARIO PRINCIPAL (Fusión de Identidad)
            // Buscamos por wallet_address (smart) O signer_address (eoa)
            let { data: user } = await supabase
                .from("users")
                .select("*")
                .or(`wallet_address.eq.${mainWalletAddress},signer_address.eq.${signerAddress},wallet_address.eq.${signerAddress},signer_address.eq.${mainWalletAddress}`)
                .maybeSingle();

            if (!user) {
                console.log("🆕 Creando nuevo usuario...");
                const { data: newUser, error: insertUserError } = await supabase
                    .from("users")
                    .insert([{
                        wallet_address: mainWalletAddress,
                        signer_address: signerAddress,
                        email: email,
                        auth_method: isSmart ? "smart" : walletId
                    }])
                    .select("*")
                    .single();

                if (insertUserError) {
                    console.error("❌ Error al crear usuario:", insertUserError.message);
                } else {
                    user = newUser;
                    console.log("✅ Usuario creado exitosamente.");
                }
            } else {
                // Actualizar record para asegurar que tenemos ambos datos vinculados
                const updates: any = {};
                if (user.wallet_address !== mainWalletAddress && !user.wallet_address?.startsWith('0x000')) {
                    updates.wallet_address = mainWalletAddress;
                }
                if (!user.signer_address || (user.signer_address !== signerAddress && signerAddress !== mainWalletAddress)) {
                    updates.signer_address = signerAddress;
                }
                if (email && user.email !== email) updates.email = email;

                if (Object.keys(updates).length > 0) {
                    console.log("🔄 Actualizando vínculos de usuario:", updates);
                    await supabase.from("users").update(updates).eq("id", user.id);
                }
            }

            // 2. SINCRONIZAR PERFIL (Vincular perfiles huérfanos)
            if (user) {
                // Buscar perfil vinculado
                let { data: profile } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("user_id", user.id)
                    .maybeSingle();

                // Si no tiene perfil vinculado, buscar perfil huérfano
                if (!profile) {
                    let { data: orphanedProfile } = await supabase
                        .from("profiles")
                        .select("*")
                        .or(`wallet_address.eq.${mainWalletAddress},wallet_address.eq.${signerAddress}`)
                        .is("user_id", null)
                        .maybeSingle();

                    if (orphanedProfile) {
                        console.log("🔗 Vinculando perfil huérfano...");
                        const { data: updatedProfile, error: linkError } = await supabase
                            .from("profiles")
                            .update({
                                user_id: user.id,
                                wallet_address: mainWalletAddress,
                                signer_address: signerAddress,
                                email: email || orphanedProfile.email
                            })
                            .eq("id", orphanedProfile.id)
                            .select("*")
                            .single();

                        if (!linkError) profile = updatedProfile;
                        console.log("✅ Perfil huérfano vinculado.");
                    } else {
                        console.log("👤 Creando nuevo perfil...");
                        const { data: newProfile, error: createError } = await supabase
                            .from("profiles")
                            .insert([
                                {
                                    user_id: user.id,
                                    wallet_address: mainWalletAddress,
                                    signer_address: signerAddress,
                                    full_name: "Usuario Leaper",
                                    email: email
                                },
                            ])
                            .select("*")
                            .single();

                        if (!createError) profile = newProfile;
                        console.log("✅ Nuevo perfil creado.");
                    }
                } else {
                    // Actualizar perfil existente si hay discrepancias
                    const profileUpdates: any = {};
                    if (profile.wallet_address !== mainWalletAddress) profileUpdates.wallet_address = mainWalletAddress;
                    if (profile.signer_address !== signerAddress) profileUpdates.signer_address = signerAddress;
                    if (email && profile.email !== email) profileUpdates.email = email;

                    if (Object.keys(profileUpdates).length > 0) {
                        console.log("🔄 Actualizando datos de perfil:", profileUpdates);
                        await supabase.from("profiles").update(profileUpdates).eq("id", profile.id);
                    }
                }
            }
        }

        syncUser();
    }, [account?.address, wallet, wallet?.getChain()?.id]);
}
