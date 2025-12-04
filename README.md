# Quote Display App / ENG

A small React (Vite) project to display quotes and longer texts with an interactive skull animation that follows the mouse, sound interactions, and handy controls. Now with Supabase integration for dynamic quote management and admin functionality.

---

## Setup & Configuration

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Configuration

Create a `.env` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup

Execute the following SQL commands in Supabase SQL Editor:

#### Create the `quotes` table
```sql
DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    content TEXT NOT NULL,
    author TEXT
);
```

#### Insert default quotes
```sql
INSERT INTO quotes (content, author) VALUES
('Le courage n''est pas l''absence de peur, mais la capacité de vaincre ce qui fait peur.', 'Nelson Mandela'),
('La vie est ce qui arrive pendant que vous êtes occupé à faire d''autres projets.', 'John Lennon');
```

#### Create function to add quotes
**⚠️ Important**: Replace 'YOUR_ADMIN_PASSWORD' with your own secure password.
```sql
CREATE OR REPLACE FUNCTION add_new_quote(
    p_password TEXT, 
    p_quote TEXT, 
    p_author TEXT
)
RETURNS VOID AS $$
BEGIN
    IF p_password = 'YOUR_ADMIN_PASSWORD' THEN
        INSERT INTO quotes (content, author)
        VALUES (p_quote, p_author);
    ELSE
        RAISE EXCEPTION 'wrong password';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Create function to delete quotes
```sql
CREATE OR REPLACE FUNCTION delete_quote(
    p_password TEXT, 
    p_quote_id INT
)
RETURNS VOID AS $$
BEGIN
    IF p_password = 'YOUR_ADMIN_PASSWORD' THEN
        DELETE FROM quotes WHERE id = p_quote_id;
    ELSE
        RAISE EXCEPTION 'wrong password';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Enable Row Level Security (Optional but recommended)
```sql
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quotes"
ON quotes FOR SELECT
USING (true);

CREATE POLICY "Only function can insert"
ON quotes FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only function can delete"
ON quotes FOR DELETE
USING (false);
```

#### Test your setup
```sql
SELECT * FROM quotes;
SELECT add_new_quote('YOUR_ADMIN_PASSWORD', 'Test citation', 'Test auteur');
SELECT delete_quote('YOUR_ADMIN_PASSWORD', 3);
SELECT * FROM quotes;
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed SQL setup instructions.

---

## Admin Access

Click on the **π** symbol in the footer to access the admin panel. Configure your admin password in the SQL functions above.

---


## Screens

- Normal view  
![short view](./screen/screen.png?raw=true "normal view")

- Long text view  
![long view](./screen/screen_long.png?raw=true "long text view")

---

## Features

- **Supabase Integration** - Dynamic quote loading from database
- **Admin Panel** - Add and delete quotes with password protection
- Interactive skull animation following the mouse  
- Dynamic rotation based on cursor position  
- Smooth animations with customizable parameters  
- Quote and long text display  
- Click sound interaction  
- Mute button  
- Copy quote to clipboard  
- Expandable view for long texts

---

## Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Technologies

- React  
- Vite
- Supabase (Database & Authentication)
- CSS3 Animations  
- Web Audio API (for sound effects)
- FontAwesome Icons

---

## TODO

- Add loading animation  
- Add unit tests for Quote component  
- Improve accessibility (keyboard navigation, ARIA labels)

---

## License & Credits

(_wirte song_)
freesound_community write song (Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38629">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38629">Pixabay</a>)

(_magic song_)
Sound Effect by <a href="https://pixabay.com/users/freesound_crunchpixstudio-49769582/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=388923">Crunchpix Studio</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=388923">Pixabay</a>

(_skull svg_)
Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2028284">OpenClipart-Vectors</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2028284">Pixabay</a>

---

## LICENSE — MIT

MIT License

Copyright (c) 2025 gleyze jonathan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

# Application d'Affichage de Citations / FR

Un projet React (Vite) permettant d'afficher des citations et de longs textes avec une animation interactive de crâne suivant le curseur, des effets sonores et des contrôles pratiques. Maintenant avec intégration Supabase pour la gestion dynamique des citations et un panneau d'administration.

---

## Installation & Configuration

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configuration Supabase

Créez un fichier `.env` à la racine du projet :
```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase
```

### 3. Configuration de la base de données

Exécutez les commandes SQL suivantes dans l'éditeur SQL de Supabase :

#### Créer la table `quotes`
```sql
DROP TABLE IF EXISTS quotes;

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    content TEXT NOT NULL,
    author TEXT
);
```

#### Insérer les citations par défaut
```sql
INSERT INTO quotes (content, author) VALUES
('Le courage n''est pas l''absence de peur, mais la capacité de vaincre ce qui fait peur.', 'Nelson Mandela'),
('La vie est ce qui arrive pendant que vous êtes occupé à faire d''autres projets.', 'John Lennon');
```

#### Créer la fonction pour ajouter une citation
**⚠️ Important**: Remplacez `'YOUR_ADMIN_PASSWORD'` par votre propre mot de passe sécurisé.
```sql
CREATE OR REPLACE FUNCTION add_new_quote(
    p_password TEXT, 
    p_quote TEXT, 
    p_author TEXT
)
RETURNS VOID AS $$
BEGIN
    IF p_password = 'VOTRE_MOT_DE_PASSE_ADMIN' THEN
        INSERT INTO quotes (content, author)
        VALUES (p_quote, p_author);
    ELSE
        RAISE EXCEPTION 'wrong password';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Créer la fonction pour supprimer une citation
```sql
CREATE OR REPLACE FUNCTION delete_quote(
    p_password TEXT, 
    p_quote_id INT
)
RETURNS VOID AS $$
BEGIN
    IF p_password = 'VOTRE_MOT_DE_PASSE_ADMIN' THEN
        DELETE FROM quotes WHERE id = p_quote_id;
    ELSE
        RAISE EXCEPTION 'wrong password';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Activer Row Level Security (Optionnel mais recommandé)
```sql
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read quotes"
ON quotes FOR SELECT
USING (true);

CREATE POLICY "Only function can insert"
ON quotes FOR INSERT
WITH CHECK (false);

CREATE POLICY "Only function can delete"
ON quotes FOR DELETE
USING (false);
```

#### Tester votre configuration
```sql
SELECT * FROM quotes;
SELECT add_new_quote('VOTRE_MOT_DE_PASSE_ADMIN', 'Test citation', 'Test auteur');
SELECT delete_quote('VOTRE_MOT_DE_PASSE_ADMIN', 3);
SELECT * FROM quotes;
```

Voir [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) pour les instructions SQL détaillées.

---

## Accès Admin

Cliquez sur le symbole **π** dans le pied de page pour accéder au panneau d'administration. Configurez votre mot de passe admin dans les fonctions SQL ci-dessus.

---

## Captures d’écran

- Vue normale  
![short view](./screen/screen.png?raw=true "vue normale")

- Vue texte long  
![long view](./screen/screen_long.png?raw=true "vue texte long")

---

## Fonctionnalités

- **Intégration Supabase** - Chargement dynamique des citations depuis la base de données
- **Panneau Admin** - Ajouter et supprimer des citations avec protection par mot de passe
- Animation de crâne interactive suivant la souris  
- Rotation dynamique selon la position du curseur  
- Animations fluides et personnalisables  
- Affichage des citations et textes longs  
- Son de clic interactif  
- Bouton muet  
- Copier la citation dans le presse-papier  
- Vue extensible pour les longs textes

---

## Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

### Compilation

```bash
npm run build
```

---

## Technologies

- React  
- Vite
- Supabase (Base de données & Authentification)
- Animations CSS3  
- Web Audio API (pour les effets sonores)
- FontAwesome Icons

---

## À faire

- Améliorer l'accessibilité (navigation clavier, labels ARIA)
- Ajouter des tests unitaires

---

## Licence et Crédits

(_wirte song_)
freesound_community write song (Sound Effect by <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38629">freesound_community</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38629">Pixabay</a>)

(_magic song_)
Sound Effect by <a href="https://pixabay.com/users/freesound_crunchpixstudio-49769582/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=388923">Crunchpix Studio</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=388923">Pixabay</a>

(_skull svg_)
Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2028284">OpenClipart-Vectors</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2028284">Pixabay</a>


---

## LICENCE — MIT

Licence MIT

Copyright (c) 2025 gleyze jonathan

Permission est accordée, gratuitement, à toute personne obtenant une copie de ce logiciel et des fichiers de documentation associés (le « Logiciel »), d'utiliser le Logiciel sans restriction, y compris sans limitation les droits d'utiliser, copier, modifier, fusionner, publier, distribuer, sous-licencier et/ou vendre des copies du Logiciel, et de permettre aux personnes à qui le Logiciel est fourni de le faire, sous réserve des conditions suivantes :

L'avis de copyright ci-dessus et cet avis d'autorisation seront inclus dans toutes les copies ou parties substantielles du Logiciel.

LE LOGICIEL EST FOURNI « TEL QUEL », SANS GARANTIE D'AUCUNE SORTE, EXPLICITE OU IMPLICITE, Y COMPRIS MAIS SANS S'Y LIMITER AUX GARANTIES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER ET D'ABSENCE DE CONTREFAÇON. EN AUCUN CAS LES AUTEURS OU DÉTENTEURS DU COPYRIGHT NE POURRONT ÊTRE TENUS RESPONSABLES DE TOUT DOMMAGE, RÉCLAMATION OU AUTRE RESPONSABILITÉ, QU’ELLE SOIT CONTRACTUELLE, DÉLICTUELLE OU AUTRE, DÉCOULANT DE L’UTILISATION OU DE L’IMPOSSIBILITÉ D’UTILISER LE LOGICIEL.

---

*README version française (mise à jour octobre 2025)*
