-- Taraya Institut — Fresh Install SQL
-- Safe for phpMyAdmin: uses double single quotes for apostrophes
-- Idempotent: TRUNCATE before INSERT

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `PricingItem`;
TRUNCATE TABLE `PricingCategory`;
TRUNCATE TABLE `Service`;
TRUNCATE TABLE `FormSubmission`;
TRUNCATE TABLE `SiteSetting`;
TRUNCATE TABLE `User`;
SET FOREIGN_KEY_CHECKS = 1;

-- ─── ADMIN USER ────────────────────────────────────────────────────────────────
-- Password: Taraya2024!
INSERT INTO `User` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`)
VALUES ('usr_admin_001', 'Admin Taraya', 'admin@taraya-institut.fr',
  '$2b$12$qpGRTqJdq9IUl0QHNW/qHOqwuGZfluRYnlwozkJdHUaNRJxyZt7rG',
  'SUPER_ADMIN', NOW(), NOW());

-- ─── SITE SETTINGS ─────────────────────────────────────────────────────────────
INSERT INTO `SiteSetting` (`key`, `value`) VALUES
('phone',              '+32471824764'),
('whatsapp',           '+32471824764'),
('email',              'tarayainstitut@hotmail.com'),
('address',            'Waalsestraat 34, 1933 Sterrebeek'),
('instagram',          ''),
('facebook',           ''),
('hero_title',         'Un institut de beauté dédié à votre bien-être'),
('hero_subtitle',      '"Là où l''on se pose, où l''on se dépose et où l''on ressort plus légère."\nTaraya Institut est un cocon réservé aux femmes, pensé pour celles qui ont besoin de souffler.\nDes soins réalisés avec soin et attention, qui prennent le temps que vous méritez.'),
('meta_title',         'Taraya Institut — Institut de beauté à Sterrebeek | Soins visage, massages, épilations'),
('meta_description',   'Institut de beauté réservé aux femmes à Sterrebeek. Soins visage Phyt''s bio, massages, pédicure médicale et esthétique, épilations. Sur rendez-vous.'),
('gtm_id',             ''),
('facebook_pixel_id',  '');

-- ─── SERVICES ──────────────────────────────────────────────────────────────────
INSERT INTO `Service` (`id`, `title`, `description`, `image`, `active`, `order`, `createdAt`, `updatedAt`) VALUES
('svc_visage',      'Soins visage Phyt''s',  'Des soins sur mesure pour votre peau, avec des produits bio français de la marque Phyt''s, choisis pour leur respect de la peau et leur efficacité.', '/images/services/service-1.webp', 1, 0, NOW(), NOW()),
('svc_massages',    'Massages Phyt''s',      'Des massages corps et visage pour relâcher les tensions et vous reconnecter à vous-même.',                                                             '/images/services/service-2.webp', 1, 1, NOW(), NOW()),
('svc_mains_pieds', 'Soins mains et pieds',  'Manucure, pédicure esthétique et médicale. Des mains et des pieds soignés.',                                                                          '/images/services/service-3.webp', 1, 2, NOW(), NOW()),
('svc_epilations',  'Épilations',            'Des épilations réalisées avec soin et précision, pour un résultat impeccable.',                                                                        '/images/services/service-4.webp', 1, 3, NOW(), NOW()),
('svc_teintures',   'Teintures',             'Teinture cils ou sourcils pour un regard plus défini, sans effort.',                                                                                  '/images/services/service-5.webp', 1, 4, NOW(), NOW());

-- ─── PRICING CATEGORIES ────────────────────────────────────────────────────────
INSERT INTO `PricingCategory` (`id`, `title`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('cat_mains_pieds', 'Soins mains et pieds', 0, 1, NOW(), NOW()),
('cat_epilations',  'Épilations',           1, 1, NOW(), NOW()),
('cat_visage',      'Soins visage Phyt''s', 2, 1, NOW(), NOW()),
('cat_teintures',   'Teintures',            3, 1, NOW(), NOW()),
('cat_massages',    'Massages Phyt''s',     4, 1, NOW(), NOW());

-- ─── PRICING ITEMS: Soins mains et pieds ───────────────────────────────────────
INSERT INTO `PricingItem` (`id`, `label`, `price`, `categoryId`, `order`, `createdAt`, `updatedAt`) VALUES
('itm_mp_01', 'Manucure',                                '35€', 'cat_mains_pieds', 0, NOW(), NOW()),
('itm_mp_02', 'Pose vernis',                             '10€', 'cat_mains_pieds', 1, NOW(), NOW()),
('itm_mp_03', 'Semi permanent',                          '40€', 'cat_mains_pieds', 2, NOW(), NOW()),
('itm_mp_04', 'Semi permanent french',                   '45€', 'cat_mains_pieds', 3, NOW(), NOW()),
('itm_mp_05', 'Manucure et semi permanent',              '70€', 'cat_mains_pieds', 4, NOW(), NOW()),
('itm_mp_06', 'Pédicure esthétique',                     '35€', 'cat_mains_pieds', 5, NOW(), NOW()),
('itm_mp_07', 'Pédicure médicale',                       '45€', 'cat_mains_pieds', 6, NOW(), NOW()),
('itm_mp_08', 'Pédicure esthétique et semi permanent',   '70€', 'cat_mains_pieds', 7, NOW(), NOW()),
('itm_mp_09', 'Pédicure médicale et semi permanent',     '80€', 'cat_mains_pieds', 8, NOW(), NOW()),
('itm_mp_10', 'Dépose semi permanent',                   '15€', 'cat_mains_pieds', 9, NOW(), NOW());

-- ─── PRICING ITEMS: Épilations ─────────────────────────────────────────────────
INSERT INTO `PricingItem` (`id`, `label`, `price`, `categoryId`, `order`, `createdAt`, `updatedAt`) VALUES
('itm_ep_01', 'Sourcils',          '12€', 'cat_epilations',  0, NOW(), NOW()),
('itm_ep_02', 'Lèvre',             '10€', 'cat_epilations',  1, NOW(), NOW()),
('itm_ep_03', 'Favoris',           '10€', 'cat_epilations',  2, NOW(), NOW()),
('itm_ep_04', 'Aisselles',         '12€', 'cat_epilations',  3, NOW(), NOW()),
('itm_ep_05', 'Bikini simple',     '15€', 'cat_epilations',  4, NOW(), NOW()),
('itm_ep_06', 'Bikini échancré',   '20€', 'cat_epilations',  5, NOW(), NOW()),
('itm_ep_07', 'Bikini brésilien',  '25€', 'cat_epilations',  6, NOW(), NOW()),
('itm_ep_08', 'Bikini intégral',   '30€', 'cat_epilations',  7, NOW(), NOW()),
('itm_ep_09', '½ jambes',          '20€', 'cat_epilations',  8, NOW(), NOW()),
('itm_ep_10', '¾ jambes',          '25€', 'cat_epilations',  9, NOW(), NOW()),
('itm_ep_11', 'Jambes complètes',  '30€', 'cat_epilations', 10, NOW(), NOW()),
('itm_ep_12', '½ bras',            '15€', 'cat_epilations', 11, NOW(), NOW()),
('itm_ep_13', 'Bras complet',      '25€', 'cat_epilations', 12, NOW(), NOW());

-- ─── PRICING ITEMS: Soins visage Phyt's ────────────────────────────────────────
INSERT INTO `PricingItem` (`id`, `label`, `price`, `categoryId`, `order`, `createdAt`, `updatedAt`) VALUES
('itm_sv_01', 'Aqua phyt''s 1h (hydratant)',                  '75€', 'cat_visage', 0, NOW(), NOW()),
('itm_sv_02', 'White bio active 1h (tâches pigmentaires)',    '70€', 'cat_visage', 1, NOW(), NOW()),
('itm_sv_03', 'Phyt''ssima 1h (nutrition)',                   '75€', 'cat_visage', 2, NOW(), NOW()),
('itm_sv_04', 'Aromaclear pureté 1h (peaux grasses)',         '70€', 'cat_visage', 3, NOW(), NOW()),
('itm_sv_05', 'Capyl 1h (sensible)',                          '60€', 'cat_visage', 4, NOW(), NOW()),
('itm_sv_06', 'Revederm 1h (éclat, anti-pollution)',          '60€', 'cat_visage', 5, NOW(), NOW()),
('itm_sv_07', 'Multi vita 1h15 (mature)',                     '95€', 'cat_visage', 6, NOW(), NOW());

-- ─── PRICING ITEMS: Teintures ──────────────────────────────────────────────────
INSERT INTO `PricingItem` (`id`, `label`, `price`, `categoryId`, `order`, `createdAt`, `updatedAt`) VALUES
('itm_te_01', 'Teinture cils ou sourcils', '18€', 'cat_teintures', 0, NOW(), NOW());

-- ─── PRICING ITEMS: Massages Phyt's ────────────────────────────────────────────
INSERT INTO `PricingItem` (`id`, `label`, `price`, `categoryId`, `order`, `createdAt`, `updatedAt`) VALUES
('itm_ma_01', 'Massage corps 60 min',                    '70€',  'cat_massages', 0, NOW(), NOW()),
('itm_ma_02', 'Massage dos 30 min',                      '45€',  'cat_massages', 1, NOW(), NOW()),
('itm_ma_03', 'Massage visage et cuir chevelu 30 min',   '45€',  'cat_massages', 2, NOW(), NOW()),
('itm_ma_04', 'Massage corps et visage 1h20',            '100€', 'cat_massages', 3, NOW(), NOW());
