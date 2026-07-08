// Traducciones EN/FR de los 8 casos de portfolio.
// El contenido real llega de Sanity en runtime (ver project-page.js); esto es
// una tabla de búsqueda por slug + idioma que project-page.js consulta antes
// de insertar cada campo en el DOM. Si Sanity está caído, el HTML estático de
// cada projects/*.html ya está en español y sirve de fallback igual.
window.CASE_I18N = {
    'chanel-hc': {
        en: {
            title: 'Chanel Haute Couture × Marie Claire Argentina',
            category: 'Creative Direction',
            location: 'New York, NY',
            categoryLine: 'Creative Direction — Editorial — New York',
            meta3: 'Four covers',
            lede: 'Producing Chanel Haute Couture for a cover isn\'t a brief that shows up by email. It\'s a relationship built over years, production by production, with Marie Claire Argentina.',
            blocks: [
                { heading: 'When the house hands you the full archive', body: '<p>In some productions, getting access to the piece is the logistical obstacle. With Chanel Haute Couture it\'s the opposite: the challenge is living up to what you\'re holding.</p><p>Four different editorials, four different moments, the same premise: show Haute Couture in New York without it reading as institutional advertising. Make it look real, make it look alive.</p>' },
                { heading: 'New York as backdrop, not as decoration', body: '<p>Every location we chose had to have a reason: the contrast between the city\'s architecture and the couture pieces says something a studio never could.</p><p>A Manhattan corner at two in the morning with a sequined Chanel dress: that\'s the image. Everything else is technique.</p>' },
                { heading: 'Four covers in a row', body: '<p>The first time Marie Claire Argentina put Chanel Haute Couture on the cover, nobody knew if it would work for the local market. It worked. We came back three more times.</p><p>What you build with consistency can\'t be replicated in a single, isolated production.</p>' },
            ],
            credits: [
                { key: 'Creative Direction', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentina' },
                { key: 'Brand', value: 'Chanel Haute Couture' },
                { key: 'Location', value: 'New York, NY' },
            ],
            nextTitle: 'Valentina Ferrer × Miu Miu',
        },
        fr: {
            title: 'Chanel Haute Couture × Marie Claire Argentine',
            category: 'Direction créative',
            location: 'New York, NY',
            categoryLine: 'Direction créative — Éditorial — New York',
            meta3: 'Quatre couvertures',
            lede: 'Produire de la Haute Couture Chanel pour une couverture, ce n\'est pas une commande qui arrive par email. C\'est une relation construite au fil des années, production après production, avec Marie Claire Argentine.',
            blocks: [
                { heading: 'Quand la maison vous donne accès à tout l\'archive', body: '<p>Dans certaines productions, l\'obstacle logistique, c\'est l\'accès à la pièce. Avec la Haute Couture Chanel, c\'est l\'inverse : le défi, c\'est d\'être à la hauteur de ce qu\'on a entre les mains.</p><p>Quatre éditoriaux différents, quatre moments différents, la même prémisse : montrer la Haute Couture à New York sans que ça ressemble à de la publicité institutionnelle. Que ça ait l\'air réel, que ça ait l\'air vivant.</p>' },
                { heading: 'New York comme toile de fond, pas comme décor', body: '<p>Chaque lieu qu\'on choisissait devait avoir une raison : le contraste entre l\'architecture de la ville et les pièces de haute couture dit quelque chose qu\'un studio ne peut pas dire.</p><p>Un coin de rue à Manhattan à deux heures du matin avec une robe Chanel à paillettes : voilà l\'image. Le reste, c\'est de la technique.</p>' },
                { heading: 'Quatre couvertures consécutives', body: '<p>La première fois que Marie Claire Argentine a mis de la Haute Couture Chanel en couverture, personne ne savait si ça marcherait pour le marché local. Ça a marché. On y est revenus trois fois de plus.</p><p>Ce qu\'on construit avec de la constance ne se réplique pas dans une production isolée.</p>' },
            ],
            credits: [
                { key: 'Direction créative', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentine' },
                { key: 'Marque', value: 'Chanel Haute Couture' },
                { key: 'Lieu', value: 'New York, NY' },
            ],
            nextTitle: 'Valentina Ferrer × Miu Miu',
        },
    },

    'valentina-ferrer': {
        en: {
            title: 'Valentina Ferrer × Miu Miu',
            category: 'Styling',
            location: 'New York, NY',
            categoryLine: 'Styling — Cover — New York, 2023',
            meta3: 'Cover',
            lede: 'The cover had to say something about returning: sophistication without nostalgia. Miu Miu, New York, a chair, and a lot of light.',
            blocks: [
                { heading: 'Miu Miu and the new tailoring', body: '<p>The collection revolved around redefined tailoring: knit jackets with structured finishes, black shorts, white shirts emerging as a contrast element.</p><p>With Valentina the challenge was always the same: she has a presence that fills the frame. The styling had to support that, not compete with it.</p>' },
                { heading: 'Three accessories, zero accidents', body: '<p>One single Miu Miu piece says a lot. Five say too much. Editing was the hardest part of this production: choosing what to take out, not what to add.</p><p>The result was the May 2023 cover. One of the best-selling issues of the year.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentina' },
                { key: 'Brand', value: 'Miu Miu' },
                { key: 'Location', value: 'New York, NY' },
                { key: 'Year', value: '2023' },
            ],
            nextTitle: 'Leonie Hanne × Dolce & Gabbana',
        },
        fr: {
            title: 'Valentina Ferrer × Miu Miu',
            category: 'Styling',
            location: 'New York, NY',
            categoryLine: 'Styling — Couverture — New York, 2023',
            meta3: 'Couverture',
            lede: 'La couverture devait dire quelque chose sur le retour : de la sophistication sans nostalgie. Miu Miu, New York, une chaise et beaucoup de lumière.',
            blocks: [
                { heading: 'Miu Miu et la nouvelle sartorialité', body: '<p>La collection tournait autour d\'une sartorialité redéfinie : vestes en maille aux finitions structurées, shorts noirs, chemises blanches qui émergeaient comme élément de contraste.</p><p>Avec Valentina, le défi a toujours été le même : elle a une présence qui remplit le cadre. Le styling devait la soutenir, pas lui faire concurrence.</p>' },
                { heading: 'Trois accessoires, aucun hasard', body: '<p>Une seule pièce Miu Miu en dit long. Cinq en disent trop. Le montage a été la partie la plus difficile de cette production : choisir quoi retirer, pas quoi ajouter.</p><p>Le résultat a été la couverture de mai 2023. L\'une des mieux vendues de l\'année.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentine' },
                { key: 'Marque', value: 'Miu Miu' },
                { key: 'Lieu', value: 'New York, NY' },
                { key: 'Année', value: '2023' },
            ],
            nextTitle: 'Leonie Hanne × Dolce & Gabbana',
        },
    },

    'leonie-hanne': {
        en: {
            title: 'Leonie Hanne × Dolce & Gabbana',
            category: 'Creative Direction',
            location: 'New York, NY',
            categoryLine: 'Creative Direction — Editorial — New York, 2024',
            meta3: '13M followers',
            lede: '13 million followers, and the confidence of someone who\'s spent a long time in front of a camera. The work was finding the angle that hadn\'t shown up yet.',
            blocks: [
                { heading: 'Beyond what\'s already known about her', body: '<p>When you work with an influencer at that scale, there\'s a pre-existing image that\'s already very defined. Leonie\'s feed is flawless, but flawless isn\'t the same as surprising.</p><p>The idea was to move away from what she already does very well, into territory where an editorial production can go further.</p>' },
                { heading: 'Dolce & Gabbana and theatricality without excess', body: '<p>D&G pieces carry their own visual charge. The risk is always excess: too much volume, too much color, too much of everything at once.</p><p>We worked with the architecture of the pieces, not against it. A Brooklyn rooftop with late-afternoon light does the rest.</p>' },
            ],
            credits: [
                { key: 'Creative Direction', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentina' },
                { key: 'Brand', value: 'Dolce & Gabbana' },
                { key: 'Location', value: 'New York, NY' },
                { key: 'Year', value: '2024' },
            ],
            nextTitle: 'Chanel Prêt-à-porter Williamsburg',
        },
        fr: {
            title: 'Leonie Hanne × Dolce & Gabbana',
            category: 'Direction créative',
            location: 'New York, NY',
            categoryLine: 'Direction créative — Éditorial — New York, 2024',
            meta3: '13M abonnés',
            lede: '13 millions d\'abonnés et l\'assurance de quelqu\'un qui passe beaucoup de temps devant une caméra. Le travail a consisté à trouver l\'angle qui n\'était pas encore apparu.',
            blocks: [
                { heading: 'Au-delà de ce que l\'on sait déjà d\'elle', body: '<p>Quand on travaille avec une influenceuse de cette envergure, il existe une image préexistante très définie. Le feed de Leonie est impeccable, mais impeccable n\'est pas synonyme de surprenant.</p><p>La proposition consistait à s\'écarter de ce qu\'elle fait déjà très bien pour entrer dans un territoire où une production éditoriale peut aller plus loin.</p>' },
                { heading: 'Dolce & Gabbana et la théâtralité sans excès', body: '<p>Les pièces D&G ont leur propre charge visuelle. Le risque, c\'est toujours l\'excès : trop de volumes, trop de couleur, trop de tout à la fois.</p><p>On a travaillé avec l\'architecture des pièces, pas contre elle. Un rooftop à Brooklyn avec une lumière de fin d\'après-midi fait le reste.</p>' },
            ],
            credits: [
                { key: 'Direction créative', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentine' },
                { key: 'Marque', value: 'Dolce & Gabbana' },
                { key: 'Lieu', value: 'New York, NY' },
                { key: 'Année', value: '2024' },
            ],
            nextTitle: 'Chanel Prêt-à-porter Williamsburg',
        },
    },

    'calu-chinatown': {
        en: {
            title: 'Calu Rivero — Chinese New Year',
            category: 'Styling',
            location: 'Chinatown, Manhattan, NY',
            categoryLine: 'Styling — Editorial — Chinatown, Manhattan',
            meta3: null,
            lede: 'No location control, no extras, with the dragon parade passing two meters away. One of the freest productions in Marie Claire Argentina\'s archive.',
            blocks: [
                { heading: 'When the street decides for you', body: '<p>Chinese New Year in Chinatown doesn\'t stop for anyone. The production had to adapt to the event\'s rhythm, not the other way around. That meant working in real time: the background changed every five minutes, people kept moving, the dragons paraded without warning.</p><p>Calu got the game from the first moment. That ability to stay present inside the chaos is what gives these photos the energy they have.</p>' },
                { heading: 'The stuffed pig that wasn\'t in the brief', body: '<p>It shows up in one of the shots and became the most shared image from the production. Nobody planned it. Someone was holding it in the crowd, Calu picked it up as naturally as she would have picked up a Chanel bag, and the photographer shot.</p><p>The best photo of the production wasn\'t the one we had imagined.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentina' },
                { key: 'Location', value: 'Chinatown, Manhattan, NY' },
            ],
            nextTitle: 'Netflix × Martín Fierro',
        },
        fr: {
            title: 'Calu Rivero — Nouvel An chinois',
            category: 'Styling',
            location: 'Chinatown, Manhattan, NY',
            categoryLine: 'Styling — Éditorial — Chinatown, Manhattan',
            meta3: null,
            lede: 'Sans contrôle du lieu, sans figurants, avec le défilé de dragons qui passait à deux mètres. L\'une des productions les plus libres des archives de Marie Claire Argentine.',
            blocks: [
                { heading: 'Quand la rue décide à votre place', body: '<p>Le Nouvel An chinois à Chinatown ne s\'arrête pour personne. La production devait s\'adapter au rythme de l\'événement, pas l\'inverse. Ça voulait dire travailler en temps réel : le fond changeait toutes les cinq minutes, les gens bougeaient, les dragons défilaient sans prévenir.</p><p>Calu a compris la règle du jeu dès le premier instant. Cette capacité à rester présente dans le chaos, c\'est ce qui donne à ces photos leur énergie.</p>' },
                { heading: 'Le cochon en peluche qui n\'était pas au programme', body: '<p>Il apparaît sur l\'une des prises et est devenu l\'image la plus partagée de la production. Personne ne l\'avait prévu. Quelqu\'un le tenait dans la foule, Calu l\'a pris avec autant de naturel qu\'un sac Chanel, et le photographe a shooté.</p><p>La meilleure photo de la production n\'était pas celle qu\'on avait imaginée.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentine' },
                { key: 'Lieu', value: 'Chinatown, Manhattan, NY' },
            ],
            nextTitle: 'Netflix × Martín Fierro',
        },
    },

    'dolores-fonzi': {
        en: {
            title: 'Dolores Fonzi',
            category: 'Celebrity Styling',
            location: 'Buenos Aires / New York',
            categoryLine: 'Celebrity Styling — Buenos Aires / New York',
            meta3: null,
            lede: 'The work was understanding how the clothes could support her without competing with her.',
            blocks: [
                { heading: 'An actress who already has style', body: '<p>Some celebrities need to be visually built from scratch. Dolores isn\'t one of them. She has a very clear aesthetic instinct and a relationship with clothes that comes from within.</p><p>Working with someone like that demands a different kind of listening. Contributing something without imposing anything.</p>' },
                { heading: 'Black on black, no concessions', body: '<p>The proposal for the El Planeta Urbano cover started from a simple principle: all black, clean structure, no distractions.</p><p>Dolores has that ability to fill the frame without the clothes having to work overtime. The black-and-white photography did the rest.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'El Planeta Urbano' },
                { key: 'Location', value: 'Buenos Aires / New York' },
            ],
            nextTitle: 'Calu Rivero — Chinese New Year',
        },
        fr: {
            title: 'Dolores Fonzi',
            category: 'Celebrity Styling',
            location: 'Buenos Aires / New York',
            categoryLine: 'Celebrity Styling — Buenos Aires / New York',
            meta3: null,
            lede: 'Le travail a consisté à comprendre comment les vêtements pouvaient l\'accompagner sans lui faire concurrence.',
            blocks: [
                { heading: 'Une actrice qui a déjà du style', body: '<p>Il y a des célébrités qu\'il faut construire visuellement à partir de rien. Dolores n\'en fait pas partie. Elle a un sens esthétique très clair et un rapport aux vêtements qui vient de l\'intérieur.</p><p>Travailler avec quelqu\'un comme ça demande une autre forme d\'écoute. Apporter quelque chose sans rien imposer.</p>' },
                { heading: 'Noir sur noir, sans concession', body: '<p>La proposition pour la couverture d\'El Planeta Urbano est partie d\'un principe simple : noir total, structure épurée, aucune distraction.</p><p>Dolores a cette capacité à remplir le cadre sans que les vêtements aient à trop en faire. La photographie en noir et blanc a fait le reste.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'El Planeta Urbano' },
                { key: 'Lieu', value: 'Buenos Aires / New York' },
            ],
            nextTitle: 'Calu Rivero — Nouvel An chinois',
        },
    },

    'chanel-williamsburg': {
        en: {
            title: 'Chanel Prêt-à-porter Williamsburg',
            category: 'Styling',
            location: 'Williamsburg, Brooklyn, NY',
            categoryLine: 'Styling — Editorial — Brooklyn, New York',
            meta3: null,
            lede: 'The street as a studio has its own rules. You learn to work with them or you lose the shot.',
            blocks: [
                { heading: 'Williamsburg before everyone discovers it', body: '<p>The production looked for the tension between what Chanel Prêt-à-porter proposes as a collection, a return to tailoring with a contemporary spirit, and Brooklyn\'s industrial spaces, which still hold onto some roughness.</p><p>It wasn\'t a decorative choice. It was a conceptual one.</p>' },
                { heading: 'The skyline as a third element', body: '<p>Manhattan from across the river shows up in some shots as an almost impossible backdrop. We weren\'t specifically looking for it. We found it while looking for something else.</p><p>Sometimes the location gives you something you didn\'t ask for, and it\'s exactly what you needed.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentina' },
                { key: 'Brand', value: 'Chanel Prêt-à-porter' },
                { key: 'Location', value: 'Williamsburg, Brooklyn, NY' },
            ],
            nextTitle: 'Dolores Fonzi',
        },
        fr: {
            title: 'Chanel Prêt-à-porter Williamsburg',
            category: 'Styling',
            location: 'Williamsburg, Brooklyn, NY',
            categoryLine: 'Styling — Éditorial — Brooklyn, New York',
            meta3: null,
            lede: 'La rue comme studio a ses propres règles. On apprend à travailler avec elles ou on perd la photo.',
            blocks: [
                { heading: 'Williamsburg avant que tout le monde le découvre', body: '<p>La production cherchait la tension entre ce que Chanel Prêt-à-porter propose comme collection, un retour à la sartorialité dans un esprit contemporain, et les espaces industriels de Brooklyn, qui gardent encore une certaine rugosité.</p><p>Ce n\'était pas un choix décoratif. C\'était un choix conceptuel.</p>' },
                { heading: 'Le skyline comme troisième élément', body: '<p>Manhattan vu de l\'autre côté du fleuve apparaît sur certaines prises comme un décor presque impossible. On ne le cherchait pas spécifiquement. On l\'a trouvé en cherchant autre chose.</p><p>Parfois le lieu vous donne quelque chose que vous n\'aviez pas demandé, et c\'est exactement ce dont vous aviez besoin.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Publication', value: 'Marie Claire Argentine' },
                { key: 'Marque', value: 'Chanel Prêt-à-porter' },
                { key: 'Lieu', value: 'Williamsburg, Brooklyn, NY' },
            ],
            nextTitle: 'Dolores Fonzi',
        },
    },

    'netflix-mf': {
        en: {
            title: 'Netflix × Martín Fierro',
            category: 'Celebrity Styling',
            location: 'Buenos Aires',
            categoryLine: 'Celebrity Styling — Red Carpet — Buenos Aires',
            meta3: 'Martín Fierro 2022',
            lede: 'Red carpet with all the pressure in the world. The context defines the decisions almost more than the look itself.',
            blocks: [
                { heading: 'The longest night of the year for local fashion', body: '<p>The Martín Fierro Awards are the moment when the whole country watches Argentina\'s entertainment industry. Netflix arrived as a nominee with a lineup of actresses representing the new national cinema. The styling had to live up to that moment.</p><p>We worked with Delfi Chavez, one of the platform\'s strongest bets for the season. The look had to say something about who she was, not about the platform.</p>' },
                { heading: 'One single decision that changes everything', body: '<p>The black lace dress we chose for Delfi was a bet. It wasn\'t the safest look, it wasn\'t the most obvious choice for the Martín Fierro Awards. But it was the right one for her.</p><p>When she hit the red carpet and the cameras started following her, we understood we\'d gotten it right. That\'s the difference between styling and costume.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Event', value: 'Martín Fierro 2022' },
                { key: 'Client', value: 'Netflix Argentina' },
                { key: 'Location', value: 'Buenos Aires' },
            ],
            nextTitle: 'Editorial Rural × Gucci',
        },
        fr: {
            title: 'Netflix × Martín Fierro',
            category: 'Celebrity Styling',
            location: 'Buenos Aires',
            categoryLine: 'Celebrity Styling — Tapis rouge — Buenos Aires',
            meta3: 'Martín Fierro 2022',
            lede: 'Un tapis rouge avec toute la pression du monde. Le contexte définit les décisions presque plus que le look lui-même.',
            blocks: [
                { heading: 'La nuit la plus longue de l\'année pour la mode locale', body: '<p>Les Martín Fierro, c\'est le moment où tout le pays regarde l\'industrie du spectacle argentine. Netflix arrivait comme nommé avec une liste d\'actrices représentant le nouveau cinéma national. Le styling devait être à la hauteur de ce moment.</p><p>On a travaillé avec Delfi Chavez, l\'un des paris les plus forts de la plateforme pour la saison. Le look devait dire quelque chose sur qui elle était, pas sur la plateforme.</p>' },
                { heading: 'Une seule décision qui change tout', body: '<p>La robe en dentelle noire qu\'on a choisie pour Delfi était un pari. Ce n\'était pas le look le plus sûr, ni le plus évident pour les Martín Fierro. Mais c\'était le bon pour elle.</p><p>Quand elle est arrivée sur le tapis rouge et que les caméras ont commencé à la suivre, on a compris qu\'on avait vu juste. C\'est ça, la différence entre le styling et le costume.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Événement', value: 'Martín Fierro 2022' },
                { key: 'Client', value: 'Netflix Argentine' },
                { key: 'Lieu', value: 'Buenos Aires' },
            ],
            nextTitle: 'Editorial Rural × Gucci',
        },
    },

    'gucci-rural': {
        en: {
            title: 'Editorial Rural × Gucci',
            category: 'Styling',
            location: 'Upstate New York',
            categoryLine: 'Styling — Editorial — Upstate New York',
            meta3: 'Independent production',
            lede: 'A pig, a goat, and Gucci pieces. Nobody expected that from an Argentine production. That was exactly the point.',
            blocks: [
                { heading: 'Luxury in the wrong place', body: '<p>The concept was simple: take seasonal Gucci pieces and place them in the context furthest possible from a fashion week. A farm in Upstate New York, real animals, dirt, red wood.</p><p>The tension between both worlds is the image. There\'s no way to do that without committing to the discomfort of that contradiction.</p>' },
                { heading: 'The photo nobody had taken', body: '<p>The close-up of the model\'s face with the newborn goat became the most widely shared image from the production. Not because it was the most obvious, but because it was the least expected.</p><p>Mixing Gucci with a baby goat has its own rules of composition. The first one: never try to control it.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Brand', value: 'Gucci' },
                { key: 'Location', value: 'Upstate New York' },
            ],
            nextLabel: 'See all the work',
            nextTitle: 'Back to portfolio',
        },
        fr: {
            title: 'Editorial Rural × Gucci',
            category: 'Styling',
            location: 'Upstate New York',
            categoryLine: 'Styling — Éditorial — Upstate New York',
            meta3: 'Production indépendante',
            lede: 'Un cochon, une chèvre et des pièces Gucci. Personne n\'attendait ça d\'une production argentine. C\'était exactement le but.',
            blocks: [
                { heading: 'Le luxe au mauvais endroit', body: '<p>Le concept était simple : prendre des pièces de saison Gucci et les placer dans le contexte le plus éloigné possible d\'une fashion week. Une ferme dans le nord de l\'État de New York, de vrais animaux, de la terre, du bois rouge.</p><p>La tension entre les deux mondes, c\'est ça l\'image. Impossible de faire ça sans s\'engager dans l\'inconfort de cette contradiction.</p>' },
                { heading: 'La photo que personne n\'avait faite', body: '<p>Le gros plan sur le visage de la mannequin avec la chevrette nouveau-née est devenu l\'image la plus partagée de la production. Pas parce que c\'était la plus évidente, mais parce que c\'était la moins attendue.</p><p>Mélanger Gucci avec un chevreau a ses propres règles de composition. La première : ne jamais essayer de le contrôler.</p>' },
            ],
            credits: [
                { key: 'Styling', value: 'Ash Mateu' },
                { key: 'Marque', value: 'Gucci' },
                { key: 'Lieu', value: 'Upstate New York' },
            ],
            nextLabel: 'Voir tout le travail',
            nextTitle: 'Retour au portfolio',
        },
    },
};
