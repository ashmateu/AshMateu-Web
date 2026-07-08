(function () {

    var TRANSLATIONS = {
        es: {
            'nav.work':                'Portfolio',
            'nav.press':               'Prensa',
            'nav.notes':               'Notas',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Mercadito',
            'nav.contact':             'Contacto',
            'nav.myaccount':           'Mi cuenta',
            'nav.logout':              'Cerrar sesión',
            'nav.menuLabel':           'Menú',
            'section.work':            'Portfolio',
            'section.services':        'Servicios',
            'section.contact':         'Contacto',
            'hero.cta.primary':        'Ver portfolio',
            'hero.cta.secondary':      'Trabajemos juntos',
            'form.name.label':         'Nombre',
            'form.name.placeholder':   'Tu nombre',
            'form.email.label':        'Email',
            'form.email.placeholder':  'tu@email.com',
            'form.message.label':      'Mensaje',
            'form.message.placeholder':'Contame sobre tu proyecto',
            'form.submit':             'Enviar →',
            'form.sending':            'Enviando...',
            'form.sent':               'Enviado',
            'form.success':            'Mensaje recibido. Te escribo pronto.',
            'form.error':              'Error al enviar. Escribime directo a info@ashmateu.com',
            'footer.work':             'Portfolio',
            'footer.contact':          'Contacto',
            'footer.home':             'Inicio',

            // ── Mercadito ──
            'mercadito.hero.title':    'El Mercadito<br><em>de Ash</em>',
            'mercadito.hero.desc1':    'Piezas seleccionadas con criterio de stylist. Vintage que vale, accesorios que duran.',
            'mercadito.hero.desc2':    'También: contenido editorial para aprender a ver la moda de otra manera.',
            'mercadito.tab.all':       'Todos',
            'mercadito.tab.pieces':    'Piezas',
            'mercadito.tab.digital':   'Digital',
            'mercadito.loading':       'Cargando productos...',
            'mercadito.aviso':         'Compra con checkout seguro de Tiendanube. Envíos a todo el país. Para consultas escribí a <strong>info@ashmateu.com</strong> o por Instagram <strong>@ashmateu</strong>.',
            'mercadito.product.imagesoon': 'Imagen próximamente',
            'mercadito.product.digital':   'Digital',
            'mercadito.product.piece':     'Pieza',
            'mercadito.product.soldout':   'Vendido',
            'mercadito.product.comingsoon':'Próximamente',
            'mercadito.product.buy':       'Comprar',
            'mercadito.product.inquire':   'Consultar',
            'mercadito.empty.title':   'El Mercadito está<br><em>entre colecciones</em>',
            'mercadito.empty.sub':     'Las próximas piezas se están eligiendo. Mientras tanto, seguí las novedades en <a href="https://instagram.com/ashmateu" target="_blank" rel="noopener">@ashmateu</a>.',

            // ── Cuenta ──
            'cuenta.label':            'Mi cuenta',
            'cuenta.noauth.title':     'Para ver tu cuenta<br><em>ingresá primero.</em>',
            'cuenta.noauth.text':      'Acá vas a encontrar el historial de tus pedidos y tus datos de contacto.',
            'cuenta.tab.orders':       'Mis pedidos',
            'cuenta.tab.data':         'Datos',
            'cuenta.orders.historyLabel': 'Historial de compras',
            'cuenta.orders.thProduct': 'Producto',
            'cuenta.orders.thDate':    'Fecha',
            'cuenta.orders.thStatus':  'Estado',
            'cuenta.orders.thTotal':   'Total',
            'cuenta.orders.empty.title': 'Todavía no tenés pedidos.',
            'cuenta.orders.empty.text':  'Cuando comprés algo en el Mercadito, tu historial aparece acá.',
            'cuenta.orders.empty.cta':   'Ir al Mercadito',
            'cuenta.data.label':      'Mis datos',
            'cuenta.data.text':       'Para modificar tus datos de contacto escribí a <strong>info@ashmateu.com</strong>.',
            'cuenta.order.fallbackItem': 'Pedido',
            'order.status.pending':   'Pendiente',
            'order.status.confirmed': 'Confirmado',
            'order.status.shipped':   'Enviado',
            'order.status.rejected':  'Rechazado',

            // ── Auth modal ──
            'auth.signin':             'Ingresar',
            'auth.createAccount':      'Crear cuenta',
            'auth.label.password':     'Contraseña',
            'auth.label.passwordConfirm': 'Confirmar contraseña',
            'auth.placeholder.passwordMin': 'Mínimo 8 caracteres',
            'auth.forgot':             '¿Olvidaste tu contraseña?',
            'auth.registerNote':       'Al crear tu cuenta aceptás recibir novedades del Mercadito.',
            'auth.err.loginRequired':  'Completá email y contraseña para ingresar.',
            'auth.err.loginFailed':    'Email o contraseña incorrectos.',
            'auth.err.emailRequired':  'Ingresá tu email.',
            'auth.err.passwordTooShort': 'La contraseña debe tener al menos 8 caracteres.',
            'auth.err.passwordMismatch': 'Las contraseñas no coinciden.',
            'auth.err.registerFailed': 'Error al crear la cuenta. Intentá de nuevo.',
            'auth.confirmEmail.title': 'Revisá tu email para confirmar tu cuenta.',
            'auth.confirmEmail.spam':  'Si no llega en unos minutos, revisá la carpeta de spam.',
            'auth.err.forgotEmailRequired': 'Primero ingresá tu email para recuperar la contraseña.',
            'auth.forgotSent':         'Si tu email está registrado, te enviamos un link para restablecer tu contraseña.',

            // ── Blog ──
            'blog.hero.title':         'Notas <em>editoriales</em>',
            'blog.loading':            'Cargando...',
            'blog.empty':              'Las notas aparecen acá cuando Ash publique la primera.',
            'blog.readMore':           'Leer nota →',
            'blog.newsletter.kicker':  'Notas editoriales',
            'blog.newsletter.title':   'Recibí las notas<br><em>en tu correo.</em>',
            'blog.newsletter.sub':     'Sin spam. Solo cuando hay algo que vale la pena leer.',
            'blog.newsletter.emailLabel': 'Correo electrónico',
            'blog.newsletter.submit':  'Suscribirme',
            'blog.newsletter.sending': 'Enviando...',
            'blog.newsletter.done':    'Listo',
            'blog.newsletter.err.invalidEmail': 'Ingresá un email válido.',
            'blog.newsletter.err.alreadySubscribed': 'Ya estás suscripta.',
            'blog.newsletter.err.generic': 'Algo falló. Intentá de nuevo.',
            'blog.newsletter.success': 'Listo. Te escribimos cuando haya algo nuevo.',

            // ── Prensa ──
            'prensa.hero.title':       'Ash Mateu<br><em>en medios</em>',
            'prensa.hero.desc':        'Marie Claire, tapas, entrevistas. Trabajo publicado en los medios de moda más importantes del país y la región.',
            'prensa.loading':          'Cargando artículos...',
            'prensa.empty':            'Los artículos aparecen acá cuando se carguen desde el panel admin.',
            'prensa.readIn':           'Leer en',
            'prensa.readArticle':      'Leer artículo →',

            // ── Casos de portfolio ──
            'case.creditsLabel':       'Créditos',
            'case.nextLabel':          'Próximo proyecto',
            'case.seeAllWork':         'Ver todo el trabajo',
        },
        en: {
            'nav.work':                'Portfolio',
            'nav.press':               'Press',
            'nav.notes':               'Notes',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Shop',
            'nav.contact':             'Contact',
            'nav.myaccount':           'My account',
            'nav.logout':              'Log out',
            'nav.menuLabel':           'Menu',
            'section.work':            'Portfolio',
            'section.services':        'Services',
            'section.contact':         'Contact',
            'hero.cta.primary':        'See portfolio',
            'hero.cta.secondary':      "Let's work together",
            'form.name.label':         'Name',
            'form.name.placeholder':   'Your name',
            'form.email.label':        'Email',
            'form.email.placeholder':  'you@email.com',
            'form.message.label':      'Message',
            'form.message.placeholder':'Tell me about your project',
            'form.submit':             'Send →',
            'form.sending':            'Sending...',
            'form.sent':               'Sent',
            'form.success':            'Message received. I\'ll write you soon.',
            'form.error':              'Error sending. Write me directly at info@ashmateu.com',
            'footer.work':             'Portfolio',
            'footer.contact':          'Contact',
            'footer.home':             'Home',
            'hero.title':              '<span class="hero-kw">Fashion</span> with <span class="hero-kw">intention</span>.<br>The <span class="hero-kw">image</span> <span class="hero-small">from within</span>.',
            'hero.subtitle':           'Chanel, Miu Miu, Gucci. Marie Claire covers.<br>Dolores Fonzi, Griselda Siciliani. Buenos Aires, New York, Paris.',
            'about.text':              '<p>Ash works from narrative to look, not the other way around. Every production starts with a question about what the image needs to say, and ends when the answer is in the frame.</p><p>Chanel, Louis Vuitton, Miu Miu, Dolce & Gabbana, Gucci, Nike, L\'Oréal, Mercedes Benz. Marie Claire Argentina covers more times than she can exactly recall. Styling for Dolores Fonzi, Griselda Siciliani, Valentina Zenere, and much of the Netflix Argentina cast.</p><p>In 2015 she founded Inside Studios, an online fashion school that reached more than 20,000 students across the region.</p><p>Available for projects in 2026. The form below is the most direct way in.</p>',
            'contact.headline':        'New projects for 2026. Write me.',
            'service.1.name':          'Creative direction',
            'service.1.desc':          'From idea to result. I conceive and produce editorials, campaigns, and content for brands that need more than a supplier.',
            'service.2.name':          'Editorial and commercial styling',
            'service.2.desc':          'I build looks for photo and audiovisual productions. Direct work with brands, photographers, and full production teams.',
            'service.3.name':          'Celebrity styling',
            'service.3.desc':          'Red carpets, events, press, appearances. Styling for public figures has its own rules and its own rhythm.',
            'service.4.name':          'Brand consulting',
            'service.4.desc':          'Fashion, beauty, culture. I work on visual identity and communication tone with brands that need a perspective that comes from the set, not a PowerPoint presentation.',
            'service.5.name':          'Trend research',
            'service.5.desc':          'I analyze what\'s happening in culture before it appears in trends, and translate it into concrete communication decisions.',

            // ── Mercadito ──
            'mercadito.hero.title':    'Ash\'s<br><em>Shop</em>',
            'mercadito.hero.desc1':    'Pieces selected with a stylist\'s eye. Vintage worth owning, accessories that last.',
            'mercadito.hero.desc2':    'Also: editorial content to help you see fashion differently.',
            'mercadito.tab.all':       'All',
            'mercadito.tab.pieces':    'Pieces',
            'mercadito.tab.digital':   'Digital',
            'mercadito.loading':       'Loading products...',
            'mercadito.aviso':         'Secure checkout via Tiendanube. Shipping across the country. For questions, write to <strong>info@ashmateu.com</strong> or on Instagram <strong>@ashmateu</strong>.',
            'mercadito.product.imagesoon': 'Image coming soon',
            'mercadito.product.digital':   'Digital',
            'mercadito.product.piece':     'Piece',
            'mercadito.product.soldout':   'Sold out',
            'mercadito.product.comingsoon':'Coming soon',
            'mercadito.product.buy':       'Buy',
            'mercadito.product.inquire':   'Inquire',
            'mercadito.empty.title':   'The shop is<br><em>between collections</em>',
            'mercadito.empty.sub':     'The next pieces are being chosen. In the meantime, follow along on <a href="https://instagram.com/ashmateu" target="_blank" rel="noopener">@ashmateu</a>.',

            // ── Cuenta ──
            'cuenta.label':            'My account',
            'cuenta.noauth.title':     'To see your account,<br><em>sign in first.</em>',
            'cuenta.noauth.text':      'Here you\'ll find your order history and contact details.',
            'cuenta.tab.orders':       'My orders',
            'cuenta.tab.data':         'Details',
            'cuenta.orders.historyLabel': 'Purchase history',
            'cuenta.orders.thProduct': 'Product',
            'cuenta.orders.thDate':    'Date',
            'cuenta.orders.thStatus':  'Status',
            'cuenta.orders.thTotal':   'Total',
            'cuenta.orders.empty.title': 'You don\'t have any orders yet.',
            'cuenta.orders.empty.text':  'When you buy something from the shop, your history shows up here.',
            'cuenta.orders.empty.cta':   'Go to the shop',
            'cuenta.data.label':      'My details',
            'cuenta.data.text':       'To update your contact details, write to <strong>info@ashmateu.com</strong>.',
            'cuenta.order.fallbackItem': 'Order',
            'order.status.pending':   'Pending',
            'order.status.confirmed': 'Confirmed',
            'order.status.shipped':   'Shipped',
            'order.status.rejected':  'Rejected',

            // ── Auth modal ──
            'auth.signin':             'Sign in',
            'auth.createAccount':      'Create account',
            'auth.label.password':     'Password',
            'auth.label.passwordConfirm': 'Confirm password',
            'auth.placeholder.passwordMin': 'At least 8 characters',
            'auth.forgot':             'Forgot your password?',
            'auth.registerNote':       'By creating an account you agree to receive updates from the shop.',
            'auth.err.loginRequired':  'Fill in your email and password to sign in.',
            'auth.err.loginFailed':    'Incorrect email or password.',
            'auth.err.emailRequired':  'Enter your email.',
            'auth.err.passwordTooShort': 'Password must be at least 8 characters.',
            'auth.err.passwordMismatch': 'Passwords don\'t match.',
            'auth.err.registerFailed': 'Error creating your account. Please try again.',
            'auth.confirmEmail.title': 'Check your email to confirm your account.',
            'auth.confirmEmail.spam':  'If it doesn\'t arrive in a few minutes, check your spam folder.',
            'auth.err.forgotEmailRequired': 'First enter your email to reset your password.',
            'auth.forgotSent':         'If your email is registered, we\'ve sent you a link to reset your password.',

            // ── Blog ──
            'blog.hero.title':         'Editorial <em>notes</em>',
            'blog.loading':            'Loading...',
            'blog.empty':              'Notes will appear here once Ash publishes the first one.',
            'blog.readMore':           'Read note →',
            'blog.newsletter.kicker':  'Editorial notes',
            'blog.newsletter.title':   'Get the notes<br><em>in your inbox.</em>',
            'blog.newsletter.sub':     'No spam. Only when there\'s something worth reading.',
            'blog.newsletter.emailLabel': 'Email address',
            'blog.newsletter.submit':  'Subscribe',
            'blog.newsletter.sending': 'Sending...',
            'blog.newsletter.done':    'Done',
            'blog.newsletter.err.invalidEmail': 'Enter a valid email.',
            'blog.newsletter.err.alreadySubscribed': 'You\'re already subscribed.',
            'blog.newsletter.err.generic': 'Something went wrong. Please try again.',
            'blog.newsletter.success': 'Done. We\'ll write to you when there\'s something new.',

            // ── Prensa ──
            'prensa.hero.title':       'Ash Mateu<br><em>in the media</em>',
            'prensa.hero.desc':        'Marie Claire, covers, interviews. Work published in the country\'s and the region\'s leading fashion media.',
            'prensa.loading':          'Loading articles...',
            'prensa.empty':            'Articles will appear here once they\'re added from the admin panel.',
            'prensa.readIn':           'Read on',
            'prensa.readArticle':      'Read article →',

            // ── Casos de portfolio ──
            'case.creditsLabel':       'Credits',
            'case.nextLabel':          'Next project',
            'case.seeAllWork':         'See all the work',
            'case.gucciRural.backToPortfolio': 'Back to portfolio <span class="case-next-arrow">→</span>',
        },
        fr: {
            'nav.work':                'Portfolio',
            'nav.press':               'Presse',
            'nav.notes':               'Notes',
            'nav.vlog':                'Vlog',
            'nav.shop':                'Boutique',
            'nav.contact':             'Contact',
            'nav.myaccount':           'Mon compte',
            'nav.logout':              'Se déconnecter',
            'nav.menuLabel':           'Menu',
            'section.work':            'Portfolio',
            'section.services':        'Services',
            'section.contact':         'Contact',
            'hero.cta.primary':        'Voir le portfolio',
            'hero.cta.secondary':      'Travaillons ensemble',
            'form.name.label':         'Nom',
            'form.name.placeholder':   'Votre nom',
            'form.email.label':        'Email',
            'form.email.placeholder':  'vous@email.com',
            'form.message.label':      'Message',
            'form.message.placeholder':'Parlez-moi de votre projet',
            'form.submit':             'Envoyer →',
            'form.sending':            'Envoi...',
            'form.sent':               'Envoyé',
            'form.success':            'Message reçu. Je vous écris bientôt.',
            'form.error':              'Erreur d\'envoi. Écrivez-moi directement à info@ashmateu.com',
            'footer.work':             'Portfolio',
            'footer.contact':          'Contact',
            'footer.home':             'Accueil',
            'hero.title':              '<span class="hero-kw">Mode</span> avec <span class="hero-kw">intention</span>.<br>L\'<span class="hero-kw">image</span> de l\'intérieur.',
            'hero.subtitle':           'Chanel, Miu Miu, Gucci. Couvertures de Marie Claire.<br>Dolores Fonzi, Griselda Siciliani. Buenos Aires, New York, Paris.',
            'about.text':              '<p>Ash part du récit pour arriver au look, jamais l\'inverse. Chaque production commence par une question sur ce que l\'image doit dire, et se termine quand la réponse est dans le cadre.</p><p>Chanel, Louis Vuitton, Miu Miu, Dolce & Gabbana, Gucci, Nike, L\'Oréal, Mercedes Benz. Des couvertures de Marie Claire Argentine plus souvent qu\'elle ne saurait le dire avec exactitude. Styling pour Dolores Fonzi, Griselda Siciliani, Valentina Zenere et une bonne partie du casting de Netflix Argentine.</p><p>En 2015, elle fonde Inside Studios, une école de mode en ligne qui a compté plus de 20 000 étudiants dans toute la région.</p><p>Disponible pour des projets en 2026. Le formulaire ci-dessous est le chemin le plus direct.</p>',
            'contact.headline':        'Nouveaux projets pour 2026. Écrivez-moi.',
            'service.1.name':          'Direction créative',
            'service.1.desc':          'De l\'idée au résultat. Je conçois et produis des éditoriaux, des campagnes et des contenus pour des marques qui ont besoin de plus qu\'un prestataire.',
            'service.2.name':          'Styling éditorial et publicitaire',
            'service.2.desc':          'Je construis des looks pour des productions photo et audiovisuelles. Travail direct avec des marques, des photographes et des équipes de production complètes.',
            'service.3.name':          'Celebrity styling',
            'service.3.desc':          'Tapis rouges, événements, presse, apparitions. Le styling pour les personnalités publiques a ses propres règles et son propre rythme.',
            'service.4.name':          'Conseil de marque',
            'service.4.desc':          'Mode, beauté, culture. Je travaille sur l\'identité visuelle et le ton de communication avec des marques qui ont besoin d\'une perspective qui vient du plateau, pas d\'une présentation PowerPoint.',
            'service.5.name':          'Trend research',
            'service.5.desc':          'J\'analyse ce qui se passe dans la culture avant que cela n\'apparaisse dans les tendances, et je le traduis en décisions de communication concrètes.',

            // ── Mercadito ──
            'mercadito.hero.title':    'La Boutique<br><em>d\'Ash</em>',
            'mercadito.hero.desc1':    'Des pièces choisies avec un œil de styliste. Du vintage qui en vaut la peine, des accessoires qui durent.',
            'mercadito.hero.desc2':    'Aussi : du contenu éditorial pour apprendre à voir la mode autrement.',
            'mercadito.tab.all':       'Tout',
            'mercadito.tab.pieces':    'Pièces',
            'mercadito.tab.digital':   'Digital',
            'mercadito.loading':       'Chargement des produits...',
            'mercadito.aviso':         'Paiement sécurisé via Tiendanube. Livraison dans tout le pays. Pour toute question, écrivez à <strong>info@ashmateu.com</strong> ou sur Instagram <strong>@ashmateu</strong>.',
            'mercadito.product.imagesoon': 'Image à venir',
            'mercadito.product.digital':   'Digital',
            'mercadito.product.piece':     'Pièce',
            'mercadito.product.soldout':   'Épuisé',
            'mercadito.product.comingsoon':'Bientôt',
            'mercadito.product.buy':       'Acheter',
            'mercadito.product.inquire':   'Nous écrire',
            'mercadito.empty.title':   'La boutique est<br><em>entre deux collections</em>',
            'mercadito.empty.sub':     'Les prochaines pièces sont en cours de sélection. En attendant, suivez les nouveautés sur <a href="https://instagram.com/ashmateu" target="_blank" rel="noopener">@ashmateu</a>.',

            // ── Cuenta ──
            'cuenta.label':            'Mon compte',
            'cuenta.noauth.title':     'Pour voir votre compte,<br><em>connectez-vous d\'abord.</em>',
            'cuenta.noauth.text':      'Vous trouverez ici l\'historique de vos commandes et vos coordonnées.',
            'cuenta.tab.orders':       'Mes commandes',
            'cuenta.tab.data':         'Infos',
            'cuenta.orders.historyLabel': 'Historique d\'achats',
            'cuenta.orders.thProduct': 'Produit',
            'cuenta.orders.thDate':    'Date',
            'cuenta.orders.thStatus':  'Statut',
            'cuenta.orders.thTotal':   'Total',
            'cuenta.orders.empty.title': 'Vous n\'avez pas encore de commande.',
            'cuenta.orders.empty.text':  'Quand vous achetez quelque chose dans la boutique, votre historique apparaît ici.',
            'cuenta.orders.empty.cta':   'Aller à la boutique',
            'cuenta.data.label':      'Mes infos',
            'cuenta.data.text':       'Pour modifier vos coordonnées, écrivez à <strong>info@ashmateu.com</strong>.',
            'cuenta.order.fallbackItem': 'Commande',
            'order.status.pending':   'En attente',
            'order.status.confirmed': 'Confirmée',
            'order.status.shipped':   'Expédiée',
            'order.status.rejected':  'Refusée',

            // ── Auth modal ──
            'auth.signin':             'Se connecter',
            'auth.createAccount':      'Créer un compte',
            'auth.label.password':     'Mot de passe',
            'auth.label.passwordConfirm': 'Confirmer le mot de passe',
            'auth.placeholder.passwordMin': '8 caractères minimum',
            'auth.forgot':             'Mot de passe oublié ?',
            'auth.registerNote':       'En créant un compte, vous acceptez de recevoir les actualités de la boutique.',
            'auth.err.loginRequired':  'Renseignez votre email et votre mot de passe pour vous connecter.',
            'auth.err.loginFailed':    'Email ou mot de passe incorrect.',
            'auth.err.emailRequired':  'Entrez votre email.',
            'auth.err.passwordTooShort': 'Le mot de passe doit contenir au moins 8 caractères.',
            'auth.err.passwordMismatch': 'Les mots de passe ne correspondent pas.',
            'auth.err.registerFailed': 'Erreur lors de la création du compte. Réessayez.',
            'auth.confirmEmail.title': 'Vérifiez votre email pour confirmer votre compte.',
            'auth.confirmEmail.spam':  'S\'il n\'arrive pas dans quelques minutes, vérifiez votre dossier spam.',
            'auth.err.forgotEmailRequired': 'Entrez d\'abord votre email pour réinitialiser votre mot de passe.',
            'auth.forgotSent':         'Si votre email est enregistré, nous vous avons envoyé un lien pour réinitialiser votre mot de passe.',

            // ── Blog ──
            'blog.hero.title':         'Notes <em>éditoriales</em>',
            'blog.loading':            'Chargement...',
            'blog.empty':              'Les notes apparaîtront ici dès qu\'Ash publiera la première.',
            'blog.readMore':           'Lire la note →',
            'blog.newsletter.kicker':  'Notes éditoriales',
            'blog.newsletter.title':   'Recevez les notes<br><em>dans votre boîte mail.</em>',
            'blog.newsletter.sub':     'Pas de spam. Seulement quand il y a quelque chose qui vaut la peine d\'être lu.',
            'blog.newsletter.emailLabel': 'Adresse email',
            'blog.newsletter.submit':  'S\'abonner',
            'blog.newsletter.sending': 'Envoi...',
            'blog.newsletter.done':    'C\'est fait',
            'blog.newsletter.err.invalidEmail': 'Entrez un email valide.',
            'blog.newsletter.err.alreadySubscribed': 'Vous êtes déjà abonnée.',
            'blog.newsletter.err.generic': 'Une erreur s\'est produite. Réessayez.',
            'blog.newsletter.success': 'C\'est fait. Nous vous écrirons quand il y aura du nouveau.',

            // ── Prensa ──
            'prensa.hero.title':       'Ash Mateu<br><em>dans les médias</em>',
            'prensa.hero.desc':        'Marie Claire, couvertures, interviews. Travail publié dans les médias de mode les plus importants du pays et de la région.',
            'prensa.loading':          'Chargement des articles...',
            'prensa.empty':            'Les articles apparaîtront ici une fois ajoutés depuis le panneau d\'administration.',
            'prensa.readIn':           'Lire sur',
            'prensa.readArticle':      'Lire l\'article →',

            // ── Casos de portfolio ──
            'case.creditsLabel':       'Crédits',
            'case.nextLabel':          'Projet suivant',
            'case.seeAllWork':         'Voir tout le travail',
            'case.gucciRural.backToPortfolio': 'Retour au portfolio <span class="case-next-arrow">→</span>',
        }
    };

    var PLACEHOLDER_KEYS = {
        'form.name.placeholder':    true,
        'form.email.placeholder':   true,
        'form.message.placeholder': true,
        'auth.placeholder.passwordMin': true,
    };

    var ARIA_KEYS = {
        'nav.menuLabel':              true,
        'blog.newsletter.emailLabel': true,
    };

    var HTML_KEYS = {
        'hero.title':   true,
        'hero.subtitle': true,
        'about.text':   true,
        'mercadito.hero.title':  true,
        'mercadito.aviso':       true,
        'mercadito.empty.title': true,
        'mercadito.empty.sub':   true,
        'cuenta.noauth.title':   true,
        'cuenta.data.text':      true,
        'blog.hero.title':       true,
        'blog.newsletter.title': true,
        'prensa.hero.title':     true,
        'case.gucciRural.backToPortfolio': true,
    };

    function getLang() {
        return localStorage.getItem('ash_lang') || 'es';
    }

    function t(key) {
        var lang = getLang();
        var dict = TRANSLATIONS[lang] || TRANSLATIONS.es;
        return dict[key] || TRANSLATIONS.es[key] || key;
    }

    // Cache del contenido original en español (cargado desde Sanity/HTML)
    var _esCache = {};

    function cacheEs() {
        document.querySelectorAll('[data-i18n-override]').forEach(function (el) {
            var key = el.dataset.i18nOverride;
            if (!_esCache[key]) {
                _esCache[key] = HTML_KEYS[key] ? el.innerHTML : el.textContent;
            }
        });
    }

    function apply() {
        var lang = getLang();
        var dict = TRANSLATIONS[lang] || TRANSLATIONS.es;

        // Static UI elements — always translate
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.dataset.i18n;
            var val = dict[key] || TRANSLATIONS.es[key];
            if (!val) return;
            if (PLACEHOLDER_KEYS[key]) {
                el.placeholder = val;
            } else if (ARIA_KEYS[key]) {
                el.setAttribute('aria-label', val);
            } else {
                el.textContent = val;
            }
        });

        // Sanity-driven elements: restore ES cache or apply translation
        document.querySelectorAll('[data-i18n-override]').forEach(function (el) {
            var key = el.dataset.i18nOverride;
            if (lang === 'es') {
                // Restaurar contenido original en español
                if (_esCache[key] !== undefined) {
                    if (HTML_KEYS[key]) {
                        el.innerHTML = _esCache[key];
                    } else {
                        el.textContent = _esCache[key];
                    }
                }
            } else {
                var val = dict[key];
                if (!val) return;
                if (HTML_KEYS[key]) {
                    el.innerHTML = val;
                } else {
                    el.textContent = val;
                }
            }
        });

        var htmlLang = lang === 'fr' ? 'fr' : (lang === 'en' ? 'en' : 'es');
        document.documentElement.lang = htmlLang;
        updateSwitcher(lang);
        window.dispatchEvent(new CustomEvent('ash:langchange', { detail: { lang: lang } }));
    }

    function setLang(lang) {
        if (!TRANSLATIONS[lang]) return;
        localStorage.setItem('ash_lang', lang);
        apply();
    }

    function updateSwitcher(activeLang) {
        document.querySelectorAll('.lang-switcher-btn').forEach(function (btn) {
            btn.style.opacity = btn.dataset.lang === activeLang ? '1' : '0.35';
        });
    }

    function injectStyles() {
        var style = document.createElement('style');
        style.textContent = [
            '.lang-switcher{display:flex;align-items:center;gap:0;margin-right:16px}',
            '.lang-switcher-btn{background:none;border:none;cursor:pointer;font-family:var(--sans,system-ui);font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:var(--sand,#B5A898);padding:2px 5px;line-height:1;transition:opacity 0.2s}',
            '.lang-switcher-btn:hover{opacity:0.75!important}',
            '.lang-switcher-sep{color:rgba(181,168,152,0.25);font-size:10px;pointer-events:none;user-select:none}',
            '@media(max-width:900px){',
            '  .lang-switcher{margin-right:0;margin-left:auto}',
            '  .lang-switcher-btn{padding:6px 6px;min-height:32px}',
            '}'
        ].join('');
        document.head.appendChild(style);
    }

    function injectSwitcher() {
        var nav = document.getElementById('nav');
        if (!nav) return;
        var hamburger = nav.querySelector('.nav-hamburger');
        var sw = document.createElement('div');
        sw.className = 'lang-switcher';
        var lang = getLang();
        ['es', 'en', 'fr'].forEach(function (l, i) {
            if (i > 0) {
                var sep = document.createElement('span');
                sep.className = 'lang-switcher-sep';
                sep.textContent = '·';
                sw.appendChild(sep);
            }
            var btn = document.createElement('button');
            btn.className = 'lang-switcher-btn';
            btn.dataset.lang = l;
            btn.textContent = l.toUpperCase();
            btn.style.opacity = l === lang ? '1' : '0.35';
            btn.setAttribute('aria-label', l === 'es' ? 'Español' : (l === 'en' ? 'English' : 'Français'));
            sw.appendChild(btn);
        });
        nav.insertBefore(sw, hamburger);
        sw.addEventListener('click', function (e) {
            var btn = e.target.closest('.lang-switcher-btn');
            if (btn && btn.dataset.lang) setLang(btn.dataset.lang);
        });
    }

    function init() {
        injectStyles();
        injectSwitcher();
        cacheEs();   // guardar HTML original antes de cualquier traducción
        apply();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.i18n = { t: t, apply: apply, getLang: getLang, setLang: setLang };
})();
