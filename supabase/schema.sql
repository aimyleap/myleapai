-- Tabla de usuarios (Maneja el ID principal y la wallet)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Tabla de perfiles (Vinculada a users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    wallet_address TEXT UNIQUE NOT NULL, -- Guardamos la wallet para facilitar consultas rápidas
    full_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de RLS (Simplificadas para el MVP, ajustar para producción)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir inserción publica de usuarios' AND tablename = 'users') THEN
        CREATE POLICY "Permitir inserción publica de usuarios" ON public.users FOR INSERT WITH CHECK (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir lectura publica de usuarios' AND tablename = 'users') THEN
        CREATE POLICY "Permitir lectura publica de usuarios" ON public.users FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir inserción publica de perfiles' AND tablename = 'profiles') THEN
        CREATE POLICY "Permitir inserción publica de perfiles" ON public.profiles FOR INSERT WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permitir lectura publica de perfiles' AND tablename = 'profiles') THEN
        CREATE POLICY "Permitir lectura publica de perfiles" ON public.profiles FOR SELECT USING (true);
    END IF;
END $$;
