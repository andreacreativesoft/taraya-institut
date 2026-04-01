-- Taraya Institut — Services & Pricing data import
-- Run this in phpMyAdmin > SQL tab
-- Safe to run multiple times (uses INSERT IGNORE)

-- ─── SERVICES ──────────────────────────────────────────────────────────────

INSERT IGNORE INTO `Service` (`id`, `title`, `description`, `image`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('svc_soins_visage',    'Soins visage Phyt''s',    'Des soins sur mesure pour votre peau, avec des produits bio français de la marque Phyt''s, choisis pour leur respect de la peau et leur efficacité.', NULL, 1, 1, NOW(), NOW()),
('svc_massages',        'Massages Phyt''s',         'Des massages corps et visage pour relâcher les tensions et vous reconnecter à vous-même.',                                                             NULL, 2, 1, NOW(), NOW()),
('svc_mains_pieds',     'Soins mains et pieds',     'Manucure, pédicure esthétique et médicale. Des mains et des pieds soignés.',                                                                          NULL, 3, 1, NOW(), NOW()),
('svc_epilations',      'Épilations',               'Des épilations réalisées avec soin et précision, pour un résultat impeccable.',                                                                       NULL, 4, 1, NOW(), NOW()),
('svc_teintures',       'Teintures',                'Teinture cils ou sourcils pour un regard plus défini, sans effort.',                                                                                  NULL, 5, 1, NOW(), NOW());

-- ─── PRICING CATEGORIES ────────────────────────────────────────────────────

INSERT IGNORE INTO `PricingCategory` (`id`, `title`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('cat_mains_pieds', 'Soins mains et pieds', 1, 1, NOW(), NOW()),
('cat_teintures',   'Teintures',            2, 1, NOW(), NOW()),
('cat_epilations',  'Épilations',           3, 1, NOW(), NOW()),
('cat_visage',      'Soins visage Phyt''s', 4, 1, NOW(), NOW()),
('cat_massages',    'Massages Phyt''s',     5, 1, NOW(), NOW());

-- ─── PRICING ITEMS — Soins mains et pieds ──────────────────────────────────

INSERT IGNORE INTO `PricingItem` (`id`, `label`, `price`, `order`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('pi_mp_01', 'Manucure',                                  '35€',  1,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_02', 'Pose vernis',                               '10€',  2,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_03', 'Semi permanent',                            '40€',  3,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_04', 'Semi permanent french',                     '45€',  4,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_05', 'Manucure et semi permanent',                '70€',  5,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_06', 'Pédicure esthétique',                       '35€',  6,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_07', 'Pédicure médicale',                         '45€',  7,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_08', 'Pédicure esthétique et semi permanent',     '70€',  8,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_09', 'Pédicure médicale et semi permanent',       '80€',  9,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_10', 'Dépose semi permanent',                     '15€',  10, 'cat_mains_pieds', NOW(), NOW());

-- ─── PRICING ITEMS — Teintures ─────────────────────────────────────────────

INSERT IGNORE INTO `PricingItem` (`id`, `label`, `price`, `order`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('pi_te_01', 'Teinture cils ou sourcils', '18€', 1, 'cat_teintures', NOW(), NOW());

-- ─── PRICING ITEMS — Épilations ────────────────────────────────────────────

INSERT IGNORE INTO `PricingItem` (`id`, `label`, `price`, `order`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('pi_ep_01', 'Sourcils',         '12€', 1,  'cat_epilations', NOW(), NOW()),
('pi_ep_02', 'Lèvre',            '10€', 2,  'cat_epilations', NOW(), NOW()),
('pi_ep_03', 'Favoris',          '10€', 3,  'cat_epilations', NOW(), NOW()),
('pi_ep_04', 'Aisselles',        '12€', 4,  'cat_epilations', NOW(), NOW()),
('pi_ep_05', 'Bikini simple',    '15€', 5,  'cat_epilations', NOW(), NOW()),
('pi_ep_06', 'Bikini échancré',  '20€', 6,  'cat_epilations', NOW(), NOW()),
('pi_ep_07', 'Bikini brésilien', '25€', 7,  'cat_epilations', NOW(), NOW()),
('pi_ep_08', 'Bikini intégral',  '30€', 8,  'cat_epilations', NOW(), NOW()),
('pi_ep_09', '½ jambes',         '20€', 9,  'cat_epilations', NOW(), NOW()),
('pi_ep_10', '¾ jambes',         '25€', 10, 'cat_epilations', NOW(), NOW()),
('pi_ep_11', 'Jambes complètes', '30€', 11, 'cat_epilations', NOW(), NOW()),
('pi_ep_12', '½ bras',           '15€', 12, 'cat_epilations', NOW(), NOW()),
('pi_ep_13', 'Bras complet',     '25€', 13, 'cat_epilations', NOW(), NOW());

-- ─── PRICING ITEMS — Soins visage Phyt's ───────────────────────────────────

INSERT IGNORE INTO `PricingItem` (`id`, `label`, `price`, `order`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('pi_sv_01', 'Aqua phyt''s 1h (hydratant)',                  '75€', 1, 'cat_visage', NOW(), NOW()),
('pi_sv_02', 'White bio active 1h (tâches pigmentaires)',    '70€', 2, 'cat_visage', NOW(), NOW()),
('pi_sv_03', 'Phyt''ssima 1h (nutrition)',                   '75€', 3, 'cat_visage', NOW(), NOW()),
('pi_sv_04', 'Aromaclear pureté 1h (peaux grasses)',         '70€', 4, 'cat_visage', NOW(), NOW()),
('pi_sv_05', 'Capyl 1h (sensible)',                          '60€', 5, 'cat_visage', NOW(), NOW()),
('pi_sv_06', 'Revederm 1h (éclat, anti-pollution)',          '60€', 6, 'cat_visage', NOW(), NOW()),
('pi_sv_07', 'Multi vita 1h15 (mature)',                     '95€', 7, 'cat_visage', NOW(), NOW());

-- ─── PRICING ITEMS — Massages Phyt's ───────────────────────────────────────

INSERT IGNORE INTO `PricingItem` (`id`, `label`, `price`, `order`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('pi_ma_01', 'Massage corps 60 min',                   '70€',  1, 'cat_massages', NOW(), NOW()),
('pi_ma_02', 'Massage dos 30 min',                     '45€',  2, 'cat_massages', NOW(), NOW()),
('pi_ma_03', 'Massage visage et cuir chevelu 30 min',  '45€',  3, 'cat_massages', NOW(), NOW()),
('pi_ma_04', 'Massage corps et visage 1h20',           '100€', 4, 'cat_massages', NOW(), NOW());
