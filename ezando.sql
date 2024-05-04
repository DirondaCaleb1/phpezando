-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 04 mai 2024 à 00:19
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ezando`
--

-- --------------------------------------------------------

--
-- Structure de la table `answers`
--

DROP TABLE IF EXISTS `answers`;
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_author` int NOT NULL,
  `pseudo_author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_question` int NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `answers`
--

INSERT INTO `answers` (`id`, `id_author`, `pseudo_author`, `id_question`, `content`) VALUES
(1, 2, 'Caleb Yoane', 4, '4'),
(2, 2, 'Caleb Yoane', 3, 'Combien de renard'),
(3, 2, 'Caleb Yoane', 5, 'Tres bien'),
(4, 2, 'Caleb Yoane', 5, 'Un peu');

-- --------------------------------------------------------

--
-- Structure de la table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_qty` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `status` tinyint NOT NULL DEFAULT '0',
  `popular` int NOT NULL DEFAULT '0',
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `meta_keyword` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `status`, `popular`, `image`, `meta_title`, `meta_description`, `meta_keyword`, `created_at`) VALUES
(1, 'Poule', 'Poulet', 'Volaille charnue elevee avec succes', 0, 1, '1692277413aigle_cat.jpg', 'Poulet', 'Volaille elevee librement', 'Volaille, Viande, Basse cour', '2023-08-15 21:10:31'),
(5, 'Canard', 'Canard', 'Canard, volaille palmipede ', 0, 1, '1695287797bird_robin_animal_cat.jpg', 'Canard', 'Canard volaille palmipede avec une chair charnue', 'Volaille, Domestique', '2023-09-19 13:54:19'),
(8, 'Poisson', 'Poisson', 'Espece aquatique, riche en proteines et en graisse', 0, 1, '1695286929chameleon_reptile_animal_cat.jpg', 'Poisson', 'Espece aquatique, riche en proteines et en graisse', 'marine, aquatique, viande', '2023-09-21 09:02:09');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tracking_no` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pinCode` int NOT NULL,
  `total_price` int NOT NULL,
  `payment_mode` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `payment_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `comments` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `tracking_no`, `user_id`, `name`, `email`, `phone`, `address`, `pinCode`, `total_price`, `payment_mode`, `payment_id`, `status`, `comments`, `created_at`) VALUES
(1, 'ezando922687895641', 2, 'Caleb Yoane Dironda Issalou', 'cdirond@gmail.com', '067895641', 'rue Lilembe, Pointe Noire', 140130, 25500, 'COD', '', 0, NULL, '2023-09-23 23:34:57'),
(2, 'ezando741567895641', 2, 'Caleb Yoane Dironda Issalou', 'cdirond@gmail.com', '067895641', 'rue Lilembe, Pointe Noire', 140130, 22500, 'COD', '', 1, NULL, '2023-09-23 23:36:51'),
(3, 'ezando592907895641', 2, 'Caleb Yoane Dironda Issalou', 'cdirond@gmail.com', '067895641', 'rue Lilembe, Pointe Noire', 140130, 10500, 'COD', '', 0, NULL, '2023-09-25 22:05:40'),
(4, 'ezando970566812010', 4, 'Quilong Juno', 'juno@gmail.com', '456812010', 'rue Lilembe, Pointe Noire', 150170, 13500, 'COD', '', 1, NULL, '2023-09-26 19:05:07'),
(5, 'ezando55262069837420', 2, 'Dironda Issalou Caleb Yoane', 'durandcaleb28@gmail.com', '33069837420', 'xvvccx', 140130, 34500, 'COD', '', 0, NULL, '2023-09-28 17:12:44'),
(6, 'ezando9144233069837420', 2, 'Dironda Issalou Caleb Yoane', 'durandcaleb28@gmail.com', '0033069837420', 'xvvccx', 140130, 40500, 'COD', '', 0, NULL, '2023-09-28 17:30:25'),
(7, 'ezando7475833069837420', 2, 'Dironda Issalou Caleb Yoane', 'durandcaleb28@gmail.com', '0033069837420', 'xvvccx', 140130, 4500, 'COD', '', 0, NULL, '2023-09-28 18:11:03');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  `price` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `qty`, `price`, `created_at`) VALUES
(1, 1, 2, 3, 8500, '2023-09-23 23:34:57'),
(2, 2, 5, 5, 4500, '2023-09-23 23:36:52'),
(3, 3, 6, 3, 3500, '2023-09-25 22:05:40'),
(4, 4, 5, 3, 4500, '2023-09-26 19:05:07'),
(5, 5, 6, 6, 3500, '2023-09-28 17:12:48'),
(6, 5, 5, 3, 4500, '2023-09-28 17:12:53'),
(7, 6, 5, 9, 4500, '2023-09-28 17:30:25'),
(8, 7, 5, 1, 4500, '2023-09-28 18:11:03');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_request`
--

DROP TABLE IF EXISTS `password_reset_request`;
CREATE TABLE IF NOT EXISTS `password_reset_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `password_reset_request`
--

INSERT INTO `password_reset_request` (`id`, `user_id`, `date_time`, `token`) VALUES
(1, 2, '2023-10-02 17:42:26', '03d19eee111c0e31d169549bd58061a0');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `small_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `original_price` int NOT NULL,
  `selling_price` int NOT NULL,
  `image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `qty` int NOT NULL,
  `status` tinyint NOT NULL,
  `trending` tinyint NOT NULL,
  `meta_title` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `meta_keywords` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `meta_description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `small_description`, `description`, `original_price`, `selling_price`, `image`, `qty`, `status`, `trending`, `meta_title`, `meta_keywords`, `meta_description`, `created_at`) VALUES
(1, 1, 'Poulet', 'Poulet', 'Poulet americain elevee a l\'air libre', 'Poulet charnue, recommandee pour le barbecue', 7500, 5000, '1695221148coq&poule_cat.jpg', 25, 1, 1, 'Poulet', 'volaille, poulet, bio, naturel', 'Poulet Americain elevee a l\'air libre; sans antibiotique et formol  issue de l\'agriculture biologique', '2023-09-19 13:24:36'),
(2, 5, 'CanardLaque', 'CanardLaque', 'Canard preparee avec du soja avec son cou', 'Canard preparee maniere cantonaise avec une soupe au soja', 10000, 8500, '1695131844cameleon_cat.jpg', 27, 0, 1, 'CanardLaque', 'canard, volaille, viande', 'Canard preparee maniere cantonaise avec une soupe au soja', '2023-09-19 13:57:24'),
(5, 5, 'CanardHache', 'CanardHache', 'viande de canard hach&eacute;', 'viande de canard preparee avec du bois de chauffe, puis hachee mis dans un bloc de saucisse. Viande d\'elevage biologique sans antibiotique et castration chimique. Viande naturellement charnue', 7500, 4500, '1695392652animal_snail_yellow_cat.jpg', 0, 0, 0, 'CanardHache', 'Viande, Vollaille, Canard', 'viande de canard preparee avec du bois de chauffe, puis hachee mis dans un bloc de saucisse. Viande d\'elevage biologique sans antibiotique et castration chimique. Viande naturellement charnue', '2023-09-22 14:24:12'),
(6, 8, 'Poisson chat', 'Poisson chat', 'Poisson d\'eau douce avec une chair graisseuse', 'Poisson d\'eau douce, generalement vivant dans les fleuves et ses affluents ', 5000, 3500, '1695679393brebis_cat.jpg', 16, 0, 1, 'Poisson chat', 'Poisson, viande, fleuve', 'Poisson d\'eau douce, generalement vivant dans les fleuves et ses affluents ', '2023-09-25 22:03:13'),
(7, 1, 'Poulet thai', 'Poulet thai', 'Poulet prepare de maniere thailandaise avec des produits thai accompagnee de riz', 'Poulet thai preparee a la maniere traditionnelle thailandaise accompagnee de boulettes de riz, de sauce soja, mangee de preference chaude avec une biere', 12000, 10000, '1695923731bird_robin_animal_cat.jpg', 8, 0, 1, 'Poulet thai', 'Poulet, thailande, viande, volaille', 'Poulet thai preparee a la maniere traditionnelle thailandaise accompagnee de boulettes de riz, de sauce soja, mangee de preference chaude avec une biere', '2023-09-28 17:55:31');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_author` int NOT NULL,
  `pseudo_author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_publish` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `title`, `description`, `content`, `id_author`, `pseudo_author`, `date_publish`) VALUES
(3, 'Renard', 'Renard', 'Renard', 4, 'Quilong Juno', '30/09/2023'),
(4, 'Quantite', 'Combien de quantite que vous disposez pour le produit poulet?', 'Combien de quantite que vous disposez pour le produit poulet?', 2, 'Caleb Yoane', '01/10/2023'),
(5, 'Coucou', 'Comment ?', 'Comment ca va?', 2, 'Caleb Yoane', '02/10/2023');

-- --------------------------------------------------------

--
-- Structure de la table `shortlist`
--

DROP TABLE IF EXISTS `shortlist`;
CREATE TABLE IF NOT EXISTS `shortlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `shortlist`
--

INSERT INTO `shortlist` (`id`, `user_id`, `product_id`, `created_at`) VALUES
(2, 2, 5, '2023-09-28 15:15:29');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` int NOT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role_as` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role_as`, `created_at`) VALUES
(1, 'Caleb Yoane Dironda Issalou', 'cdirondaissalou@gmail.com', 67895641, '$2y$10$nSZ6IlABGeuP6MUiTqyPBuYTJEI5hkxtaZq2AGIUe1q8JwmLl0tJS', 0, '2023-08-09 11:20:07'),
(2, 'Caleb Yoane', 'cdirond@gmail.com', 84521420, '$2y$10$p/ucU9yx1OKrjx42gygHmO.vb3BDlUmWYEYWcuzXh9Yvi.A8wooSi', 1, '2023-08-09 11:34:17'),
(3, 'Dironda', 'cdirondaissalou12@gmail.com', 45212632, '$2y$10$dJDJoFcFG6jpPVBFgV40autB2nJkER51y8mNop61h6Ev6IV8i98ce', 0, '2023-08-10 14:15:12'),
(4, 'Quilong Juno', 'juno@gmail.com', 456812010, '$2y$10$ObxoLwkmJHHYMMlLGebSpOpjGHZx6MNNU3Q1wp4km7sgVBOFrS.Yu', 0, '2023-09-26 14:32:35');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
