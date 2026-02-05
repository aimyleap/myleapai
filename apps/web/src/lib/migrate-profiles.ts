import { supabase } from "@/lib/supabase";

/**
 * Script de utilidad para sincronizar manualmente cuentas de Thirdweb con Supabase
 * Útil para migraciones iniciales o limpieza de inconsistencias.
 */
export async function migrateMissingProfiles(accounts: { address: string; label?: string }[]) {
    console.log("Iniciando migración de perfiles...");

    for (const acc of accounts) {
        const walletAddress = acc.address.toLowerCase();

        // Verificar si ya existe
        const { data: profile } = await supabase
            .from("profiles")
            .select("id")
            .eq("wallet_address", walletAddress)
            .single();

        if (!profile) {
            console.log(`Migrando cuenta: ${walletAddress} (${acc.label || "Sin etiqueta"})`);

            const { error } = await supabase
                .from("profiles")
                .insert([
                    {
                        wallet_address: walletAddress,
                        full_name: acc.label || "Usuario Migrado",
                        bio: "Perfil sincronizado desde el sistema de billeteras Thirdweb."
                    }
                ]);

            if (error) {
                console.error(`Error migrando ${walletAddress}:`, error.message);
            } else {
                console.log(`✅ ${walletAddress} migrado con éxito.`);
            }
        } else {
            console.log(`⏩ ${walletAddress} ya existe en Supabase.`);
        }
    }
}
