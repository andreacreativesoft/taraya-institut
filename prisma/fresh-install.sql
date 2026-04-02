-- ============================================================
--  Taraya Institut -- FRESH INSTALL
--  Works on any existing database - drops and recreates everything.
--  phpMyAdmin > SQL tab > paste all > Go
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `PricingItem`;
DROP TABLE IF EXISTS `PricingCategory`;
DROP TABLE IF EXISTS `Service`;
DROP TABLE IF EXISTS `FormSubmission`;
DROP TABLE IF EXISTS `SiteSetting`;
DROP TABLE IF EXISTS `ContentBlock`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `_prisma_migrations`;

CREATE TABLE `_prisma_migrations` (
  `id`                  VARCHAR(36)      NOT NULL,
  `checksum`            VARCHAR(64)      NOT NULL,
  `finished_at`         DATETIME(3)          NULL,
  `migration_name`      VARCHAR(255)     NOT NULL,
  `logs`                TEXT                 NULL,
  `rolled_back_at`      DATETIME(3)          NULL,
  `started_at`          DATETIME(3)      NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` INTEGER UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `User` (
  `id`        VARCHAR(191) NOT NULL,
  `email`     VARCHAR(191) NOT NULL,
  `password`  VARCHAR(191) NOT NULL,
  `name`      VARCHAR(191) NOT NULL,
  `role`      ENUM('ADMIN','SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',
  `createdAt` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3)  NOT NULL,
  UNIQUE INDEX `User_email_key` (`email`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ContentBlock` (
  `id`        VARCHAR(191) NOT NULL,
  `key`       VARCHAR(191) NOT NULL,
  `label`     VARCHAR(191) NOT NULL,
  `content`   JSON         NOT NULL,
  `active`    BOOLEAN      NOT NULL DEFAULT true,
  `order`     INTEGER      NOT NULL DEFAULT 0,
  `updatedAt` DATETIME(3)  NOT NULL,
  UNIQUE INDEX `ContentBlock_key_key` (`key`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Service` (
  `id`          VARCHAR(191) NOT NULL,
  `title`       VARCHAR(191) NOT NULL,
  `description` TEXT         NOT NULL,
  `image`       VARCHAR(191)     NULL,
  `order`       INTEGER      NOT NULL DEFAULT 0,
  `active`      BOOLEAN      NOT NULL DEFAULT true,
  `createdAt`   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt`   DATETIME(3)  NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `PricingCategory` (
  `id`        VARCHAR(191) NOT NULL,
  `title`     VARCHAR(191) NOT NULL,
  `order`     INTEGER      NOT NULL DEFAULT 0,
  `active`    BOOLEAN      NOT NULL DEFAULT true,
  `createdAt` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3)  NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `PricingItem` (
  `id`         VARCHAR(191) NOT NULL,
  `label`      VARCHAR(191) NOT NULL,
  `price`      VARCHAR(191) NOT NULL,
  `order`      INTEGER      NOT NULL DEFAULT 0,
  `categoryId` VARCHAR(191) NOT NULL,
  `createdAt`  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt`  DATETIME(3)  NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `FormSubmission` (
  `id`        VARCHAR(191) NOT NULL,
  `name`      VARCHAR(191) NOT NULL,
  `email`     VARCHAR(191) NOT NULL,
  `phone`     VARCHAR(191)     NULL,
  `service`   VARCHAR(191)     NULL,
  `message`   TEXT         NOT NULL,
  `read`      BOOLEAN      NOT NULL DEFAULT false,
  `createdAt` DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `SiteSetting` (
  `key`   VARCHAR(191) NOT NULL,
  `value` TEXT         NOT NULL,
  PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `PricingItem`
  ADD CONSTRAINT `PricingItem_categoryId_fkey`
  FOREIGN KEY (`categoryId`) REFERENCES `PricingCategory`(`id`)
  ON DELETE CASCADE ON UPDATE CASCADE;

SET FOREIGN_KEY_CHECKS = 1;

-- Admin user  (login: admin@taraya-institut.fr / Taraya2024!)
INSERT INTO `User` (`id`, `email`, `password`, `name`, `role`, `createdAt`, `updatedAt`) VALUES (
  'clsuperadmin0000000000000',
  'admin@taraya-institut.fr',
  '$2b$12$8TCRyGkGU94w6wOLnPavO.ICa5Kb/DcyTHEGs4sOP9uXLdWOEyQxe',
  'Super Admin',
  'SUPER_ADMIN',
  NOW(), NOW()
);

INSERT INTO `SiteSetting` (`key`, `value`) VALUES
('phone',            '+32471824764'),
('whatsapp',         '0471824764'),
('email',            'tarayainstitut@hotmail.com'),
('address',          'Waalsestraat 34, 1933 Sterrebeek'),
('instagram',        ''),
('facebook',         ''),
('hero_title',       'Un institut de beaute dedie a votre bien-etre'),
('hero_subtitle',    'Uniquement sur rendez-vous'),
('meta_title',       'Taraya Institut - Soins beaute a Sterrebeek'),
('meta_description', 'Institut de beaute a Sterrebeek. Soins visage, massages, epilations et plus.'),
('gtm_id',           '');

INSERT INTO `Service` (`id`, `title`, `description`, `image`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('svc_soins_visage', 'Soins visage Phyt''s',  'Des soins sur mesure pour votre peau, avec des produits bio francais de la marque Phyt''s, choisis pour leur respect de la peau et leur efficacite.', NULL, 1, 1, NOW(), NOW()),
('svc_massages',     'Massages Phyt''s',       'Des massages corps et visage pour relacher les tensions et vous reconnecter a vous-meme.',                                                             NULL, 2, 1, NOW(), NOW()),
('svc_mains_pieds',  'Soins mains et pieds',   'Manucure, pedicure esthetique et medicale. Des mains et des pieds soignes.',                                                                          NULL, 3, 1, NOW(), NOW()),
('svc_epilations',   'Epilations',             'Des epilations realisees avec soin et precision, pour un resultat impeccable.',                                                                        NULL, 4, 1, NOW(), NOW()),
('svc_teintures',    'Teintures',              'Teinture cils ou sourcils pour un regard plus defini, sans effort.',                                                                                  NULL, 5, 1, NOW(), NOW());

INSERT INTO `PricingCategory` (`id`, `title`, `order`, `active`, `createdAt`, `updatedAt`) VALUES
('cat_mains_pieds', 'Soins mains et pieds', 1, 1, NOW(), NOW()),
('cat_teintures',   'Teintures',            2, 1, NOW(), NOW()),
('cat_epilations',  'Epilations',           3, 1, NOW(), NOW()),
('cat_visage',      'Soins visage Phyt''s', 4, 1, NOW(), NOW()),
('cat_massages',    'Massages Phyt''s',     5, 1, NOW(), NOW());

INSERT INTO `PricingItem` (`id`, `label`, `price`, `order`, `categoryId`, `createdAt`, `updatedAt`) VALUES
('pi_mp_01', 'Manucure',                              '35 EUR',  1,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_02', 'Pose vernis',                           '10 EUR',  2,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_03', 'Semi permanent',                        '40 EUR',  3,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_04', 'Semi permanent french',                 '45 EUR',  4,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_05', 'Manucure et semi permanent',            '70 EUR',  5,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_06', 'Pedicure esthetique',                   '35 EUR',  6,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_07', 'Pedicure medicale',                     '45 EUR',  7,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_08', 'Pedicure esthetique et semi permanent', '70 EUR',  8,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_09', 'Pedicure medicale et semi permanent',   '80 EUR',  9,  'cat_mains_pieds', NOW(), NOW()),
('pi_mp_10', 'Depose semi permanent',                 '15 EUR',  10, 'cat_mains_pieds', NOW(), NOW()),
('pi_te_01', 'Teinture cils ou sourcils',             '18 EUR',  1,  'cat_teintures',   NOW(), NOW()),
('pi_ep_01', 'Sourcils',                              '12 EUR',  1,  'cat_epilations',  NOW(), NOW()),
('pi_ep_02', 'Levre',                                 '10 EUR',  2,  'cat_epilations',  NOW(), NOW()),
('pi_ep_03', 'Favoris',                               '10 EUR',  3,  'cat_epilations',  NOW(), NOW()),
('pi_ep_04', 'Aisselles',                             '12 EUR',  4,  'cat_epilations',  NOW(), NOW()),
('pi_ep_05', 'Bikini simple',                         '15 EUR',  5,  'cat_epilations',  NOW(), NOW()),
('pi_ep_06', 'Bikini echancre',                       '20 EUR',  6,  'cat_epilations',  NOW(), NOW()),
('pi_ep_07', 'Bikini bresilien',                      '25 EUR',  7,  'cat_epilations',  NOW(), NOW()),
('pi_ep_08', 'Bikini integral',                       '30 EUR',  8,  'cat_epilations',  NOW(), NOW()),
('pi_ep_09', '1/2 jambes',                            '20 EUR',  9,  'cat_epilations',  NOW(), NOW()),
('pi_ep_10', '3/4 jambes',                            '25 EUR',  10, 'cat_epilations',  NOW(), NOW()),
('pi_ep_11', 'Jambes completes',                      '30 EUR',  11, 'cat_epilations',  NOW(), NOW()),
('pi_ep_12', '1/2 bras',                              '15 EUR',  12, 'cat_epilations',  NOW(), NOW()),
('pi_ep_13', 'Bras complet',                          '25 EUR',  13, 'cat_epilations',  NOW(), NOW()),
('pi_sv_01', 'Aqua phyt''s 1h (hydratant)',           '75 EUR',  1,  'cat_visage',      NOW(), NOW()),
('pi_sv_02', 'White bio active 1h (taches)',          '70 EUR',  2,  'cat_visage',      NOW(), NOW()),
('pi_sv_03', 'Phyt''ssima 1h (nutrition)',            '75 EUR',  3,  'cat_visage',      NOW(), NOW()),
('pi_sv_04', 'Aromaclear purete 1h (peaux grasses)',  '70 EUR',  4,  'cat_visage',      NOW(), NOW()),
('pi_sv_05', 'Capyl 1h (sensible)',                   '60 EUR',  5,  'cat_visage',      NOW(), NOW()),
('pi_sv_06', 'Revederm 1h (eclat, anti-pollution)',   '60 EUR',  6,  'cat_visage',      NOW(), NOW()),
('pi_sv_07', 'Multi vita 1h15 (mature)',              '95 EUR',  7,  'cat_visage',      NOW(), NOW()),
('pi_ma_01', 'Massage corps 60 min',                  '70 EUR',  1,  'cat_massages',    NOW(), NOW()),
('pi_ma_02', 'Massage dos 30 min',                    '45 EUR',  2,  'cat_massages',    NOW(), NOW()),
('pi_ma_03', 'Massage visage et cuir chevelu 30 min', '45 EUR',  3,  'cat_massages',    NOW(), NOW()),
('pi_ma_04', 'Massage corps et visage 1h20',          '100 EUR', 4,  'cat_massages',    NOW(), NOW());
