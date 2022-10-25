-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Sep 20, 2022 at 12:49 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `org_kafo`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lat` double(8,2) DEFAULT NULL,
  `lan` double(8,2) DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `user_id`, `created_by`, `updated_by`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES
(37, 148, 148, NULL, 0, '2022-07-01 22:02:58', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` enum('draft','canceled','rejected','completed','closed','published') NOT NULL DEFAULT 'draft',
  `vedio_url` varchar(299) DEFAULT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `reason_cancel` text DEFAULT NULL,
  `publish_date` datetime DEFAULT NULL,
  `secret_info_id` int(11) UNSIGNED DEFAULT NULL,
  `ar_name` varchar(999) DEFAULT NULL,
  `ar_describtion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`id`, `name`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `status`, `vedio_url`, `is_active`, `reason_cancel`, `publish_date`, `secret_info_id`, `ar_name`, `ar_describtion`) VALUES
(95, 'testmn', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor incididunt ut labore et dolore magna aliqua. Ut enim ad \n\nveniam, quis nostrud exercitation ullamco laboris nisi ut aliqui   ecommodo consequat. Duis aute irure dolor in reprehenderit\nvelit esse cillum dolore eu fugiat nulla pariatur.', 148, 148, '2022-08-29 08:46:20', '2022-09-12 08:40:32', 'published', 'https://www.youtube.com/watch?v=zWgy7fjURzc', b'1', NULL, '2022-08-29 17:41:10', 91, NULL, NULL),
(96, 'test', 'testt t', 148, 148, '2022-08-29 17:43:07', '2022-09-19 12:00:43', 'published', 'https://www.youtube.com/watch?v=6fNy0iD3hsk', b'1', NULL, '2022-08-29 17:43:12', NULL, NULL, NULL),
(97, 'd', 'nk', 148, 148, '2022-09-12 10:28:09', '2022-09-12 10:28:57', 'published', NULL, b'1', NULL, '2022-09-12 10:28:57', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `case_donors`
--

CREATE TABLE `case_donors` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `case_id` int(11) UNSIGNED NOT NULL,
  `donor_id` int(11) UNSIGNED NOT NULL,
  `amount` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `case_donors`
--

INSERT INTO `case_donors` (`id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `case_id`, `donor_id`, `amount`) VALUES
(1, NULL, NULL, '2022-09-06 08:00:55', '2022-09-06 08:00:55', 95, 60, 500),
(2, NULL, NULL, '2022-09-10 13:10:26', '2022-09-10 13:10:26', 96, 66, 500),
(3, NULL, NULL, '2022-09-18 20:22:31', '2022-09-18 20:22:31', 95, 61, 55),
(4, NULL, NULL, '2022-09-18 20:26:56', '2022-09-18 20:26:56', 95, 61, 55),
(5, NULL, NULL, '2022-09-18 20:27:09', '2022-09-18 20:27:09', 95, 61, 55);

-- --------------------------------------------------------

--
-- Table structure for table `case_followers`
--

CREATE TABLE `case_followers` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `donor_id` int(11) UNSIGNED NOT NULL,
  `case_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `case_followers`
--

INSERT INTO `case_followers` (`id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `donor_id`, `case_id`) VALUES
(19, NULL, NULL, '2022-09-06 18:36:22', '2022-09-06 18:36:22', 61, 96);

-- --------------------------------------------------------

--
-- Table structure for table `case_updates`
--

CREATE TABLE `case_updates` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `case_id` int(10) UNSIGNED NOT NULL,
  `description` text DEFAULT NULL,
  `views_count` bigint(20) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `case_updates`
--

INSERT INTO `case_updates` (`id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `case_id`, `description`, `views_count`, `is_active`) VALUES
(1, 148, NULL, '2022-09-05 09:15:50', '2022-09-06 10:51:08', 95, 'update for today 05-09-2022', 0, 0),
(2, 148, NULL, '2022-09-06 09:57:26', '2022-09-12 08:44:58', 95, 'sadasdsadasdsadasdsadasdsadasdsadasd\nsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdsadasdv', 0, 1),
(3, 148, NULL, '2022-09-06 09:57:27', '2022-09-06 10:51:26', 95, 'sadasd', 0, 1),
(4, 148, NULL, '2022-09-19 12:00:36', '2022-09-19 12:00:36', 96, 'xxssss', 0, 1),
(5, 148, NULL, '2022-09-19 12:00:43', '2022-09-19 12:00:46', 96, 'cccc', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `ar_name` varchar(999) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`, `is_active`, `ar_name`) VALUES
(36, 'damascus', 148, NULL, '2022-07-24 17:16:52', '2022-09-20 07:44:28', 1, 'اختبار'),
(37, 'fdgfd', 148, NULL, '2022-07-29 16:11:55', '2022-08-28 11:41:25', 0, NULL),
(38, 'test1', 148, NULL, '2022-08-24 10:53:50', '2022-09-20 07:41:31', 0, NULL),
(39, 'aleppo', 148, NULL, '2022-08-28 11:40:24', '2022-08-28 11:40:24', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `costs`
--

CREATE TABLE `costs` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `case_id` int(10) UNSIGNED NOT NULL,
  `value` double NOT NULL,
  `status` enum('paid','not_paid') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'not_paid',
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `ar_name` varchar(999) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `costs`
--

INSERT INTO `costs` (`id`, `name`, `created_by`, `updated_by`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `case_id`, `value`, `status`, `is_active`, `ar_name`) VALUES
(15, 'test', NULL, NULL, 0, '2022-08-29 09:20:03', '2022-09-05 09:17:11', NULL, 95, 100, 'not_paid', b'1', NULL),
(16, 'po', NULL, NULL, 0, '2022-08-29 17:44:34', '2022-08-29 17:44:34', NULL, 95, 50, 'not_paid', b'1', NULL),
(17, 'ew', NULL, NULL, 0, '2022-08-31 14:41:42', '2022-08-31 14:41:42', NULL, 95, 0, 'not_paid', b'1', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`, `is_active`) VALUES
(1, 'test1435', 100, NULL, '2022-07-12 07:02:05', '2022-07-29 16:18:08', 1),
(2, 'syria', 100, NULL, '2022-07-18 04:50:30', '2022-08-28 11:41:51', 1),
(3, 'Damascus', 100, NULL, '2022-07-18 04:50:40', '2022-08-28 11:41:47', 1),
(4, 'حمص', 100, NULL, '2022-07-18 04:50:53', '2022-07-24 18:53:37', 0),
(5, '3423', 148, NULL, '2022-07-29 16:13:28', '2022-07-29 16:13:28', 1);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `donors`
--

CREATE TABLE `donors` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `wallet_id` int(10) UNSIGNED DEFAULT NULL,
  `secret_name` varchar(299) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender_id` int(10) UNSIGNED DEFAULT NULL,
  `country_id` int(10) UNSIGNED DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `gender` enum('Female','Male') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_id` int(10) UNSIGNED DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `donors`
--

INSERT INTO `donors` (`id`, `user_id`, `wallet_id`, `secret_name`, `gender_id`, `country_id`, `birth_date`, `gender`, `city_id`, `created_by`, `updated_by`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES
(60, 174, 24, 'est858858vvv', NULL, 2, '2022-09-01 00:00:00', 'Male', 39, NULL, NULL, 0, '2022-08-30 05:18:36', '2022-09-13 10:42:05', NULL),
(61, 175, 25, 'est858858', NULL, 2, NULL, NULL, 36, NULL, NULL, 0, '2022-08-30 18:52:20', '2022-09-15 13:05:55', NULL),
(62, 176, 26, 'est858858', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-08-31 14:52:24', '2022-08-31 14:55:49', NULL),
(63, 177, 27, 'est858858', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-01 08:38:24', '2022-09-18 11:43:10', NULL),
(64, 178, 28, 'Yyyyy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-03 19:34:18', '2022-09-03 19:34:18', NULL),
(65, 179, 29, 'tester', NULL, NULL, NULL, 'Female', NULL, NULL, NULL, 0, '2022-09-05 10:22:47', '2022-09-05 12:17:50', NULL),
(66, 180, 30, 'est858858', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-08 06:09:26', '2022-09-10 12:36:05', NULL),
(67, 181, 31, 'Secret 2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-08 08:16:40', '2022-09-08 08:16:40', NULL),
(68, 182, 32, 'est858858', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-09 08:23:44', '2022-09-14 10:41:19', NULL),
(69, 183, 33, 'mm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-10 06:10:30', '2022-09-10 06:10:30', NULL),
(70, 184, 34, 'D', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-10 11:41:53', '2022-09-10 11:41:53', NULL),
(71, 185, 35, 'Hasn', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-10 21:11:33', '2022-09-10 21:11:33', NULL),
(72, 186, 36, 'donor', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-14 11:19:15', '2022-09-14 11:19:15', NULL),
(73, 187, 37, 'secretname', NULL, NULL, NULL, 'Female', NULL, NULL, NULL, 0, '2022-09-14 11:23:12', '2022-09-14 12:08:17', NULL),
(74, 188, 38, 'estaaq', NULL, 4, '2022-09-07 00:00:00', 'Male', 36, NULL, NULL, 0, '2022-09-14 12:17:00', '2022-09-19 11:02:51', NULL),
(75, 189, 39, 'zxcvhnn', NULL, 2, '2022-09-13 00:00:00', 'Male', 36, NULL, NULL, 0, '2022-09-14 12:30:21', '2022-09-14 12:34:03', NULL),
(76, 190, 40, 'test', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-14 12:38:42', '2022-09-14 12:38:42', NULL),
(77, 191, 41, 'gfffv', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2022-09-18 19:01:47', '2022-09-18 19:01:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `status` enum('online','busy','offline','') COLLATE utf8mb4_unicode_ci DEFAULT 'offline'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` int(10) UNSIGNED NOT NULL,
  `path` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_count` int(10) UNSIGNED NOT NULL,
  `copy_count` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `sub_order_id` int(10) UNSIGNED NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indexes`
--

CREATE TABLE `indexes` (
  `id` int(10) UNSIGNED NOT NULL,
  `value` varchar(299) NOT NULL,
  `module` enum('gender') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `indexes`
--

INSERT INTO `indexes` (`id`, `value`, `module`) VALUES
(1, 'Female', 'gender'),
(2, 'Male', 'gender');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disk` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversions_disk` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint(20) UNSIGNED NOT NULL,
  `manipulations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `custom_properties` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `generated_conversions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `responsive_images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `order_column` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `model_type`, `model_id`, `uuid`, `collection_name`, `name`, `file_name`, `mime_type`, `disk`, `conversions_disk`, `size`, `manipulations`, `custom_properties`, `generated_conversions`, `responsive_images`, `order_column`, `created_at`, `updated_at`) VALUES
(310, 'App\\Models\\Validation', 27, NULL, 'images_Validations', '1661762873_262340156_1736221449901860_4774147241342270909_n', '1661762873_262340156_1736221449901860_4774147241342270909_n.jpg', 'image/jpeg', 'local', NULL, 91587, '[]', '[]', NULL, '[]', 2, '2022-08-29 08:47:57', '2022-08-29 08:47:57'),
(311, 'App\\Models\\Validation', 30, NULL, 'images_Validations', '1661762899_262340156_1736221449901860_4774147241342270909_n', '1661762899_262340156_1736221449901860_4774147241342270909_n.jpg', 'image/jpeg', 'local', NULL, 91587, '[]', '[]', NULL, '[]', 3, '2022-08-29 08:48:21', '2022-08-29 08:48:21'),
(314, 'App\\Models\\SuccessStory', 14, NULL, 'Cover_Photo', '1661772154_262340156_1736221449901860_4774147241342270909_n', '1661772154_262340156_1736221449901860_4774147241342270909_n.jpg', 'image/jpeg', 'local', NULL, 91587, '[]', '[]', NULL, '[]', 6, '2022-08-29 11:22:37', '2022-08-29 11:22:37'),
(316, 'App\\Models\\CaseDonation', 96, NULL, 'images_Case', '1661794985_kafo icon', '1661794985_kafo-icon.jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 8, '2022-08-29 17:43:07', '2022-08-29 17:43:07'),
(317, 'App\\Models\\CaseDonation', 96, NULL, 'images_Case', '1661794985_logoK - Copy', '1661794985_logoK---Copy.jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 9, '2022-08-29 17:43:07', '2022-08-29 17:43:07'),
(318, 'App\\Models\\Donor', 60, NULL, 'receipt_image', '1661843289_1661676154_7Rzmk', '1661843289_1661676154_7Rzmk.jpeg', 'image/jpeg', 'local', NULL, 23855, '[]', '[]', NULL, '[]', 10, '2022-08-30 07:08:11', '2022-08-30 07:08:11'),
(323, 'App\\Models\\CaseDonation', 96, NULL, 'Cover_Photo', '1662237032_1661794985_logoK---Copy', '1662237032_1661794985_logoK---Copy.jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 12, '2022-09-03 20:30:34', '2022-09-03 20:30:34'),
(324, 'App\\Models\\CaseDonation', 95, NULL, 'images_Case', '1662279551_1661345755_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8', '1662279551_1661345755_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8.jfif', 'image/jpeg', 'local', NULL, 31413, '[]', '[]', NULL, '[]', 13, '2022-09-04 08:19:17', '2022-09-04 08:19:17'),
(327, 'App\\Models\\CaseDonation', 95, NULL, 'images_Case', '1662365223_5f2611a4-cc7c-4c22-842c-cb0ff488d39f', '1662365223_5f2611a4-cc7c-4c22-842c-cb0ff488d39f.jfif', 'image/jpeg', 'local', NULL, 57935, '[]', '[]', NULL, '[]', 16, '2022-09-05 08:07:05', '2022-09-05 08:07:05'),
(328, 'App\\Models\\CaseUpdate', 1, NULL, 'update_case', '1662369350_89e10fcf-098a-4cca-871a-ea5f0543fd1d', '1662369350_89e10fcf-098a-4cca-871a-ea5f0543fd1d.jfif', 'image/jpeg', 'local', NULL, 29785, '[]', '[]', NULL, '[]', 17, '2022-09-05 09:15:50', '2022-09-05 09:15:50'),
(329, 'App\\Models\\SuccessStory', 14, NULL, 'images_Success_stories', '1662372122_89e10fcf-098a-4cca-871a-ea5f0543fd1d', '1662372122_89e10fcf-098a-4cca-871a-ea5f0543fd1d.jfif', 'image/jpeg', 'local', NULL, 29785, '[]', '[]', NULL, '[]', 18, '2022-09-05 10:02:12', '2022-09-05 10:02:12'),
(330, 'App\\Models\\SuccessStory', 14, NULL, 'images_Success_stories', '1662372127_722ac02c-52eb-456e-aa89-cde816806eba', '1662372127_722ac02c-52eb-456e-aa89-cde816806eba.jfif', 'image/jpeg', 'local', NULL, 132267, '[]', '[]', NULL, '[]', 19, '2022-09-05 10:02:12', '2022-09-05 10:02:12'),
(331, 'App\\Models\\SuccessStory', 15, NULL, 'Cover_Photo', '1662372934_032ffae1-577b-4fd9-be8c-6e822420dcd8', '1662372934_032ffae1-577b-4fd9-be8c-6e822420dcd8.jfif', 'image/jpeg', 'local', NULL, 116607, '[]', '[]', NULL, '[]', 20, '2022-09-05 10:15:43', '2022-09-05 10:15:43'),
(333, 'App\\Models\\SuccessStory', 15, NULL, 'images_Success_stories', '1662373219_89e10fcf-098a-4cca-871a-ea5f0543fd1d', '1662373219_89e10fcf-098a-4cca-871a-ea5f0543fd1d.jfif', 'image/jpeg', 'local', NULL, 29785, '[]', '[]', NULL, '[]', 21, '2022-09-05 10:20:25', '2022-09-05 10:20:25'),
(334, 'App\\Models\\Provider', 109, NULL, 'provider', '1662373800_7Rzmk', '1662373800_7Rzmk.jpeg', 'image/jpeg', 'local', NULL, 23855, '[]', '[]', NULL, '[]', 22, '2022-09-05 10:30:02', '2022-09-05 10:30:02'),
(336, 'App\\Models\\Donor', 65, NULL, 'receipt_image', '1662380450_89e10fcf-098a-4cca-871a-ea5f0543fd1d', '1662380450_89e10fcf-098a-4cca-871a-ea5f0543fd1d.jfif', 'image/jpeg', 'local', NULL, 29785, '[]', '[]', NULL, '[]', 23, '2022-09-05 12:20:53', '2022-09-05 12:20:53'),
(337, 'App\\Models\\CaseUpdate', 2, NULL, 'update_case', '1662461478_1661676154_7Rzmk', '1662461478_1661676154_7Rzmk.jpeg', 'image/jpeg', 'local', NULL, 23855, '[]', '[]', NULL, '[]', 24, '2022-09-06 10:51:19', '2022-09-06 10:51:19'),
(338, 'App\\Models\\CaseUpdate', 3, NULL, 'update_case', '1662461486_1661345755_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8', '1662461486_1661345755_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8.jfif', 'image/jpeg', 'local', NULL, 31413, '[]', '[]', NULL, '[]', 25, '2022-09-06 10:51:26', '2022-09-06 10:51:26'),
(340, 'App\\Models\\SuccessStory', 14, NULL, 'images_Success_stories', '1662972088_5f2611a4-cc7c-4c22-842c-cb0ff488d39f', '1662972088_5f2611a4-cc7c-4c22-842c-cb0ff488d39f.jfif', 'image/jpeg', 'local', NULL, 57935, '[]', '[]', NULL, '[]', 27, '2022-09-12 08:41:35', '2022-09-12 08:41:35'),
(341, 'App\\Models\\SuccessStory', 14, NULL, 'images_Success_stories', '1662972111_032ffae1-577b-4fd9-be8c-6e822420dcd8', '1662972111_032ffae1-577b-4fd9-be8c-6e822420dcd8.jfif', 'image/jpeg', 'local', NULL, 116607, '[]', '[]', NULL, '[]', 28, '2022-09-12 08:42:10', '2022-09-12 08:42:10'),
(342, 'App\\Models\\SuccessStory', 14, NULL, 'images_Success_stories', '1662972116_89e10fcf-098a-4cca-871a-ea5f0543fd1d', '1662972116_89e10fcf-098a-4cca-871a-ea5f0543fd1d.jfif', 'image/jpeg', 'local', NULL, 29785, '[]', '[]', NULL, '[]', 29, '2022-09-12 08:42:10', '2022-09-12 08:42:10'),
(343, 'App\\Models\\CaseDonation', 95, NULL, 'images_Case', '1662972146_722ac02c-52eb-456e-aa89-cde816806eba', '1662972146_722ac02c-52eb-456e-aa89-cde816806eba.jfif', 'image/jpeg', 'local', NULL, 132267, '[]', '[]', NULL, '[]', 30, '2022-09-12 08:42:33', '2022-09-12 08:42:33'),
(344, 'App\\Models\\CaseDonation', 95, NULL, 'images_Case', '1662972146_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8', '1662972146_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8.jfif', 'image/jpeg', 'local', NULL, 31413, '[]', '[]', NULL, '[]', 31, '2022-09-12 08:42:33', '2022-09-12 08:42:33'),
(345, 'App\\Models\\CaseDonation', 95, NULL, 'images_Case', '1662972146_d46328d4-73c8-425c-998d-c20446628ad1', '1662972146_d46328d4-73c8-425c-998d-c20446628ad1.jfif', 'image/jpeg', 'local', NULL, 34713, '[]', '[]', NULL, '[]', 32, '2022-09-12 08:42:33', '2022-09-12 08:42:33'),
(346, 'App\\Models\\CaseDonation', 95, NULL, 'Cover_Photo', '1662974599_1662235687_logoK-(1)', '1662974599_1662235687_logoK-(1).jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 33, '2022-09-12 09:23:21', '2022-09-12 09:23:21'),
(347, 'App\\Models\\CaseDonation', 97, NULL, 'Cover_Photo', '1662978488_1662235687_logoK-(1)', '1662978488_1662235687_logoK-(1).jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 34, '2022-09-12 10:28:09', '2022-09-12 10:28:09'),
(348, 'App\\Models\\Donor', 69, NULL, 'Donors', '1663242480_1661345755_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8', '1663242480_1661345755_c89c6f6e-e442-4fc9-a47d-bb6ece0622a8.jfif', 'image/jpeg', 'local', NULL, 31413, '[]', '[]', NULL, '[]', 35, '2022-09-15 11:48:01', '2022-09-15 11:48:01'),
(361, 'App\\Models\\Donor', 74, NULL, 'Donors', 'image_picker7150744355307515667', 'image_picker7150744355307515667.jpg', 'image/jpeg', 'local', NULL, 742718, '[]', '[]', NULL, '[]', 37, '2022-09-18 18:57:46', '2022-09-18 18:57:46'),
(363, 'App\\Models\\Provider', 110, NULL, 'provider', '1663588675_1662235687_logoK-(1)', '1663588675_1662235687_logoK-(1).jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 38, '2022-09-19 11:57:56', '2022-09-19 11:57:56'),
(365, 'App\\Models\\Donor', 61, NULL, 'Donors', 'logoK', 'logoK.jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 40, '2022-09-19 18:21:01', '2022-09-19 18:21:01'),
(366, 'App\\Models\\Donor', 61, NULL, 'Donors', 'logoK', 'logoK.jpg', 'image/jpeg', 'local', NULL, 33660, '[]', '[]', NULL, '[]', 41, '2022-09-19 18:21:05', '2022-09-19 18:21:05');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2018_09_26_163300_order', 1),
(9, '2019_03_08_132412_create_permission_tables', 1),
(10, '2019_08_19_000000_create_failed_jobs_table', 1),
(11, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(12, '2022_04_18_195613_create_media_table', 1),
(13, '2022_04_25_172722_create_notifications_table', 1),
(14, '2022_08_03_233639_create_verification_codes_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` int(10) UNSIGNED NOT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 100);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notifiable_id` bigint(20) UNSIGNED NOT NULL,
  `data` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('001b278cba49937ad2d1a392580f51c63801d966f1acbba1cb7e6d762fc196e3d73be99ffc792e19', 190, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:38:48', '2022-09-14 12:38:48', '2023-09-14 12:38:48'),
('0050b9c855472699e0edeb5112593c0eb5fac10867481862b7ba094f723b2a4773cbb4f2025cbf2e', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 21:56:29', '2022-09-12 21:56:29', '2023-09-12 21:56:29'),
('007471609eb4726495cbbff02eca090a91aeded57c4e070e8c07068a52dbe417fac9b5d99ca4e359', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:14:49', '2022-09-19 10:14:49', '2023-09-19 10:14:49'),
('008f3b2c22e49ca2f8864d03563613d8361496c508d1046a7ddf526479a626c399e9d54f5b7e2b6d', 148, 1, 'authToken', '[]', 0, '2022-08-29 11:37:45', '2022-08-29 11:37:45', '2023-08-29 11:37:45'),
('00a79057a959ee3aec8c5e29d262cb171d25474414c1c81bcb14701ea119c58c1337ea65f33c6175', 1, 1, 'authToken', '[]', 1, '2022-05-01 12:51:46', '2022-05-01 12:51:46', '2023-05-01 15:51:46'),
('00ebcd17148b3be87bcb32e73fdda603b3d19601bb0bb726607cc6edb6e938bfc2acdafcb9792743', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-30 18:52:30', '2022-08-30 18:52:30', '2023-08-30 18:52:30'),
('01b17f55e350df414cac2a42f02fb57ca459c5953221a6ea6ec05834b0af11d71ef5dd13488848af', 148, 1, 'authToken', '[]', 0, '2022-08-30 05:23:51', '2022-08-30 05:23:51', '2023-08-30 05:23:51'),
('02884b4cb0c9815f4618ab9b441b6d50dd46f142b15124077339600c0ff8672ae50e9ab6c02c0c39', 148, 1, 'authToken', '[]', 0, '2022-09-07 05:08:48', '2022-09-07 05:08:48', '2023-09-07 05:08:48'),
('0293f77a135fc35e8a7e6ccfb07b6edf25cb7605fd687633f44a54cfdd208e0d7472357239e6f7ed', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 19:51:37', '2022-09-09 19:51:37', '2023-09-09 19:51:37'),
('0326c8426c57a0ce3cea081493e9fc6bb586ecbc35873afd396e3be763d4fc5b221f0e3412dd0561', 148, 1, 'authToken', '[]', 0, '2022-07-23 12:25:43', '2022-07-23 12:25:43', '2023-07-23 15:25:43'),
('0330f886915fd780a9379ef73cf93d2194673112e67327b59b0b22199033770723811c7c059d87fa', 171, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 07:32:39', '2022-08-28 07:32:39', '2023-08-28 07:32:39'),
('03dc48bf1474fb941925bf3fd4651b50cb9eef6cd7351e3e1bbfcb9048ac43d49057434668301b48', 148, 1, 'authToken', '[]', 0, '2022-07-24 13:48:54', '2022-07-24 13:48:54', '2023-07-24 16:48:54'),
('04c95fb6ff1f9852a04777b20c297242ccbcda39bd2c65b6c5274029b329c7b21d6ba0f249255c2f', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:01:41', '2022-09-19 10:01:41', '2023-09-19 10:01:41'),
('0583e5ca5399d165f44b82124d5680c2bcd13504b466df2f6ee69f868830ee013a7ebe5d8520412c', 1, 1, 'authToken', '[]', 1, '2022-05-13 11:18:32', '2022-05-13 11:18:32', '2023-05-13 14:18:32'),
('05f4bd67b94ebdb801a62427b3537857a95867c3a5cae688a2ea6a0474cfc241c557b5611bb662a9', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 15:27:45', '2022-09-15 15:27:45', '2023-09-15 15:27:45'),
('063e32a72119f796d42e8219b04c4b2074e8699db7b32f6b1f55d8efe2b43fe864b5b017d911c344', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 15:51:30', '2022-08-28 15:51:30', '2023-08-28 15:51:30'),
('07683e1dbbae6ba987538e015d417f319bd53b3d8d22cda673e1dd67fa65fc215d9fe1a8b978e631', 148, 1, 'authToken', '[]', 0, '2022-07-23 12:27:13', '2022-07-23 12:27:13', '2023-07-23 15:27:13'),
('085c5b513e759237dedc32c2f6bf14ea8213ca1a0043c650ae2d6337cd04bb52545d4321e7d51e0c', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:45:25', '2022-09-14 12:45:25', '2023-09-14 12:45:25'),
('0c1ea6936adb0b5469af107a933981f3cf1a9a5db94a4071826a8895523b797e9b12bf57a6b57198', 1, 1, 'authToken', '[]', 0, '2022-05-13 14:22:22', '2022-05-13 14:22:22', '2023-05-13 17:22:22'),
('0d0f33103362ea8c82bf839b4d4b5cb6afcc774f273ba8d4705f051f87f188be20e8a82a3ed7c325', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:37:52', '2022-09-19 10:37:52', '2023-09-19 10:37:52'),
('0e63a69fa5b8d4071ca7d3e564772fe3878a7dab4b9fe1d603b8373890441e81a847308f5263ac35', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 06:11:05', '2022-09-08 06:11:05', '2023-09-08 06:11:05'),
('0e87751c6ab8dd9f059b0105981e353cec9e975b02bf5845a30a05497fa8690e69cd034e951c4b09', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 14:47:26', '2022-09-15 14:47:26', '2023-09-15 14:47:26'),
('0f7de812701e2c4a041e55afaf968e2233083d50eae5a915d5cfa1ae7b907b9edec1bbae35f80a0f', 148, 1, 'authToken', '[]', 0, '2022-07-24 15:03:36', '2022-07-24 15:03:36', '2023-07-24 18:03:36'),
('1067dd570ef1c15cad16c5cd7dedec92cd81b567b47551d8b91fc1576bc930d7356663a1491967a9', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:02:12', '2022-09-17 10:02:12', '2023-09-17 10:02:12'),
('11de480f16e199234ec90006f7439a56a1646147dbe8fda8830be73b564b047e4b62cf33476a8018', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 21:58:43', '2022-08-03 21:58:43', '2023-08-04 00:58:43'),
('11ef6c467986db81abd78b449b28cb05be265033abdd2528ff9a46d10269db1f3b53f3769aa1e1ab', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:11:01', '2022-08-03 20:11:01', '2023-08-03 23:11:01'),
('120457afef13973416086f462b9291f21101a2e82d60194d4f539ebab695d84016e9a0a76939b800', 148, 1, 'authToken', '[]', 0, '2022-07-26 17:09:53', '2022-07-26 17:09:53', '2023-07-26 20:09:53'),
('12d20bbe1e8df536cbf27838c417c31ba0d8417daa2b018788e100b05f6f3f8717f9e4a8c0187a2c', 183, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-10 06:10:36', '2022-09-10 06:10:36', '2023-09-10 06:10:36'),
('12e909ad6ad9f920cbcce0ba64b227a440fa087115e8fa317c1299deb5567f0d5be257bddf7555e8', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:25:05', '2022-09-18 11:25:05', '2023-09-18 11:25:05'),
('132085c3a8977c76e95bb8419e30125ace533b6ccea6e977f922bcb8caca61529317fc194893c3aa', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:49:53', '2022-09-14 12:49:53', '2023-09-14 12:49:53'),
('13f3b4bfe4e9934c8a12f0108044714deeb9723b934dabfa8b08521f49a7f198d22cc93ce2035a35', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:13:15', '2022-06-16 15:13:15', '2023-06-16 18:13:15'),
('1483586ec54d8162082c130e387af82b0b870a84c96aa4c311c3697aa698e3d7bbc79fd54570ea1e', 1, 1, 'authToken', '[]', 1, '2022-05-01 13:31:32', '2022-05-01 13:31:32', '2023-05-01 16:31:32'),
('157a1921a9ef690b33bcd772f4afbcc22db0200a2d3cb8d4ed0518ff303444a7244a8f1fa98a470a', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-03 19:34:25', '2022-09-03 19:34:25', '2023-09-03 19:34:25'),
('159a988044c167b16b0f0c3830491c4d11a33e054ccca0d51173cd24b8cab0897f78d1763f1a0372', 148, 1, 'authToken', '[]', 1, '2022-08-22 12:35:34', '2022-08-22 12:35:34', '2023-08-22 12:35:34'),
('15e346c8f1952258bdf5f31dc904876b5385f85121e80237568abaf46e494fdf932246e3f0b90726', 148, 1, 'authToken', '[]', 0, '2022-09-06 08:15:32', '2022-09-06 08:15:32', '2023-09-06 08:15:32'),
('161196b0f3c20a0cc61a5aac93a10132b5da3691ad9bd1baf733b09faa4f59b1b4bfd61143dbae2f', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-22 10:23:32', '2022-08-22 10:23:32', '2023-08-22 10:23:32'),
('161aeba3e058cf1fbfbc7b2c617b5bc41b2911731374b7306d84853860b5096eedef0175873229c2', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:17:54', '2022-09-14 12:17:54', '2023-09-14 12:17:54'),
('16569c4f78879308b2a9002949da3e8aae85ba855bb52ea4bf1d345e1e36a4fb1a19da1d6a0c7ae5', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:12:31', '2022-07-09 21:12:31', '2023-07-10 00:12:31'),
('172b88df61dfaee5d6419032c254137e16a3fd1c55e5bd0cfd2f9079150e04a68468ec18ea93a72c', 148, 1, 'authToken', '[]', 0, '2022-08-24 13:40:53', '2022-08-24 13:40:53', '2023-08-24 13:40:53'),
('173d8064920f1bec2cc045ca3e435cb6bae067aef966de6aa3401aef667817c57380a113896c65e0', 1, 1, 'authToken', '[]', 0, '2022-05-30 12:04:06', '2022-05-30 12:04:06', '2023-05-30 15:04:06'),
('1757eda97c7e7ce39aca8f6b78df730705c6d09bb9f79a8de5621afc6a94fb9783ecd06594a3fd8d', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 13:03:04', '2022-09-15 13:03:04', '2023-09-15 13:03:04'),
('17651168ec41398a13048e5d995677ec5801e8fe472ae740c71630b8363c6af30d6264d3f17f651d', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-30 07:02:21', '2022-08-30 07:02:21', '2023-08-30 07:02:21'),
('177e1f2acfee214ebead4c4f443c32927b7279090e0b56c322cd68d7dff60ca84082dc1e4cd03d65', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:15:42', '2022-09-06 10:15:42', '2023-09-06 10:15:42'),
('17d992851beeea15b41630abeb6e707c5b7ca00867a9e5614bd0075ea28bafd7d52b7317a555e734', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:21:12', '2022-09-15 11:21:12', '2023-09-15 11:21:12'),
('18e3db2c1a2debc8a90113bf93ef3c1937e0f8f65ebbca21fac7aa933641b86e075e86db382bb202', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 09:48:37', '2022-09-12 09:48:37', '2023-09-12 09:48:37'),
('1929ba6a0ca3de24c83263d9a8b34758dabe456246fdb7d7f18810172ec9da828b6f34715ae56d3c', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 17:13:40', '2022-09-11 17:13:40', '2023-09-11 17:13:40'),
('1afbce713d51015da86fb75dd2bf5edeaf276cda0ec42b887271269b81fd3d97eb6506491097cab8', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:25:32', '2022-09-19 10:25:32', '2023-09-19 10:25:32'),
('1bfac511f3f527a35f0dc3d03be7676ec64319028affc1f16235697691fed1ca444261e37869169a', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:28:08', '2022-09-14 12:28:08', '2023-09-14 12:28:08'),
('1d5324319a98136f9df45a1ca1db15cfe596a2e2939910f168dc41c26cabb42d8d73abd89e9ada0c', 152, 1, 'Laravel Password Grant Client', '[]', 1, '2022-08-03 20:02:45', '2022-08-03 20:02:45', '2023-08-03 23:02:45'),
('1d775d396dc416cac8c36e9c61583f06e2e3d859373f6a704423d791374c6ee36a8d802a8644e319', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:23:52', '2022-09-19 10:23:52', '2023-09-19 10:23:52'),
('1dd640fbfa0cb9657b9ee17b7eaa88a8f57cf7813a730a1218623c592939d61f880ccc0dbadc4fdd', 148, 1, 'authToken', '[]', 0, '2022-08-01 01:51:02', '2022-08-01 01:51:02', '2023-08-01 04:51:02'),
('1e2cd748831a89681891789571d5ebbc76b5b8d3d3e1217703c143e84d1c0f24a715ba8ae7bbb1a4', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:18:00', '2022-09-06 10:18:00', '2023-09-06 10:18:00'),
('1eaa6e554f31ac1df4b7eb116847f7d255960fddb69dfd35d4411d1e3634b167014cc7aed4e48c2e', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-30 19:07:56', '2022-08-30 19:07:56', '2023-08-30 19:07:56'),
('1fb59e7dd36c1d3d95574122d36fe84562df9594cdffdbf3acdaf56efd7b504c6721a4f63e1f94f1', 148, 1, 'authToken', '[]', 1, '2022-09-07 04:59:55', '2022-09-07 04:59:55', '2023-09-07 04:59:55'),
('1fe116eb9e73442f1b51f50d3b01cb6d06210b3ade6ec937de219f43b1ce97028c9d3553ea9d92f8', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 18:54:03', '2022-09-11 18:54:03', '2023-09-11 18:54:03'),
('204948695d8a3deae73375b856b7894aeef44941dae7a629bb17c310227cb903b8395e925e8005e1', 171, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 10:07:09', '2022-08-28 10:07:09', '2023-08-28 10:07:09'),
('207ced5faa0e299495639c7b6fb049026cdc7fb4e610af6c397bf1f18d1efd44c5af0c915365e6a6', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 21:57:57', '2022-09-12 21:57:57', '2023-09-12 21:57:57'),
('2103259078b0d5e7894489cf8327bba7fcf4b418601cf98d2c92294b7536734ffe795beb30cf95a1', 148, 1, 'authToken', '[]', 0, '2022-08-29 11:20:56', '2022-08-29 11:20:56', '2023-08-29 11:20:56'),
('217ffd773ec45411f0b455ac4c3a0e092361e54f4eff298d76f209ba3d24ebf5901493c9fa9feb62', 148, 1, 'authToken', '[]', 0, '2022-07-30 16:49:26', '2022-07-30 16:49:26', '2023-07-30 19:49:26'),
('21d111ccbc3b5de4096823766e0b4177fb336c15cb6568f9ab7236f7ac92e8a998132f72b8bf7086', 148, 1, 'authToken', '[]', 1, '2022-08-24 12:58:19', '2022-08-24 12:58:19', '2023-08-24 12:58:19'),
('21d12030be55afcbc874c7604917d94c5b353efa7083f521a1d9f09b1b1f406c09280a212f46a2cd', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 19:47:28', '2022-09-09 19:47:28', '2023-09-09 19:47:28'),
('22c2339e826d6d423944967ac0e955b5c048509db54b1d8532a1ab26ff4e152a85629356cee82682', 148, 1, 'authToken', '[]', 0, '2022-09-03 20:07:48', '2022-09-03 20:07:48', '2023-09-03 20:07:48'),
('22c741b0dc703eef81757fcfa4caa37ac1a4ff722fb0733f0364e91edccfbd30435fbd7e76306696', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 14:27:04', '2022-09-08 14:27:04', '2023-09-08 14:27:04'),
('22d3efc611874cbe371c9fb5449e80808b286bf9b85fa8bcfc18a11bed9469bbb28764b8bef9875d', 148, 1, 'authToken', '[]', 0, '2022-09-04 18:24:05', '2022-09-04 18:24:05', '2023-09-04 18:24:05'),
('23266310d9422998b9a667e98bcf8fdee900b14252b7c5b3e14e89940c59417fc93270ec2973d4de', 148, 1, 'authToken', '[]', 1, '2022-08-22 10:26:29', '2022-08-22 10:26:29', '2023-08-22 10:26:29'),
('25443ffd27774b1960293988d9cf9e75f476aa37259f4fa1ca9797612eb9b9783037f561b54a84c3', 1, 1, 'authToken', '[]', 0, '2022-05-13 11:14:31', '2022-05-13 11:14:31', '2023-05-13 14:14:31'),
('25a7a8d12eeb341d8f425923ecb80906ae5b70b7b88ce10fe5e8a045f2ef41f083576fde5a0a4d6f', 148, 1, 'authToken', '[]', 0, '2022-09-20 05:15:20', '2022-09-20 05:15:20', '2023-09-20 08:15:20'),
('26925efe158931a838372b23c2117f68f1ccdc1594f046e45a254f652547c9b49f4758188e8b1599', 100, 1, 'authToken', '[]', 1, '2022-07-10 05:14:11', '2022-07-10 05:14:11', '2023-07-10 08:14:11'),
('26c76798b197bddb607a0f723e7981a2e6d59797d3f611969479a8f38b62dfa9e970ec6ef1ce61fa', 1, 1, 'authToken', '[]', 0, '2022-05-13 11:22:22', '2022-05-13 11:22:22', '2023-05-13 14:22:22'),
('2890ce34bfc4cc2bfbdb6c6b761c22b596b8b37166bea44b7eca96f00475cf1e13040be2ccbe4d17', 148, 1, 'authToken', '[]', 1, '2022-09-07 17:20:44', '2022-09-07 17:20:44', '2023-09-07 17:20:44'),
('28d20d0692ede12cfe863e369f0b7a097191e87ffb04fc831e679f73f2906ece05f6c38c1a0551aa', 100, 1, 'authToken', '[]', 1, '2022-07-10 05:15:05', '2022-07-10 05:15:05', '2023-07-10 08:15:05'),
('298a1dbab49193fb28972b76adff62560c4ebf40f1c8302bb370502e3c2fc55678ce53b1749642c7', 38, 1, 'authToken', '[]', 0, '2022-04-28 20:17:14', '2022-04-28 20:17:14', '2023-04-28 23:17:14'),
('29bcdf203b84629820e16d916486df8bd27103998157ab82d79f27f098b8c6901e14dd0aef629512', 148, 1, 'authToken', '[]', 0, '2022-07-23 12:31:12', '2022-07-23 12:31:12', '2023-07-23 15:31:12'),
('2a622198939ec41a4fa900dba263a896c526b9e3fdd65243ee57bc2e8cabc836955406c8b4ca8bf5', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 15:14:09', '2022-09-15 15:14:09', '2023-09-15 15:14:09'),
('2a6fbe568cab441d690d8b9ac62f7323c668c11ab2064371ee67444f93f87eb6a39ef4167cf76d89', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:36:11', '2022-09-18 11:36:11', '2023-09-18 11:36:11'),
('2ae3ad5087d91e8dda22122b936d140e45a5f042fe4172b6a2951ab6a76139dc6182bee9f66df38f', 148, 1, 'authToken', '[]', 0, '2022-08-22 10:59:09', '2022-08-22 10:59:09', '2023-08-22 10:59:09'),
('2b69689bc931ed5e518091ad89db04630f0f847018a8d00abf87fa2db5c254bda11cdd4e1b927ebe', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:51:27', '2022-09-17 10:51:27', '2023-09-17 10:51:27'),
('2c278c6964f47150ec1095ca8e7fb61b0375ed10eea9df8c421937e47e6ecffa3cf68bcc4d4e8121', 177, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:29:58', '2022-09-18 11:29:58', '2023-09-18 11:29:58'),
('2c4f58afa485d534c905d65f21f687f8f342ccb03975274d65cfa9b982d7ae90bf3b1f4c50cfa951', 177, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-01 08:39:41', '2022-09-01 08:39:41', '2023-09-01 08:39:41'),
('2c7b0c6771f1ee6e775ee845bc762570e6dc520f8a4b2357f549a807970aad57226e714a24375d76', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 12:46:51', '2022-09-15 12:46:51', '2023-09-15 12:46:51'),
('2cde2c6e6f41561ea7553431db8f84bc227a8cd494a781f1c3c77260c079e4eedfbceb948a94e5a7', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:10:39', '2022-08-03 20:10:39', '2023-08-03 23:10:39'),
('2cf1cbca9b1f9574c19c622db164b8367b91e13897636ee1e3cd614adecab57cc1e36a6344d24585', 148, 1, 'authToken', '[]', 0, '2022-09-05 11:50:13', '2022-09-05 11:50:13', '2023-09-05 11:50:13'),
('2d05b322855b992f9561b3e8dc5282466a56c5a2bd3f2677a5fa67b4a69a5b080d060704b7099465', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 12:19:51', '2022-09-15 12:19:51', '2023-09-15 12:19:51'),
('2d169ce39647514cb78b1217cb53f396c808608b03f3b6b6a80ecb6aac7a89e5b5f801185a0fff73', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:32:01', '2022-09-15 11:32:01', '2023-09-15 11:32:01'),
('2d39db3ac43035c74020455417310a6bff76806f43282e46d47853180ee953e1a4e92da2a6451c0e', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:15:07', '2022-09-06 10:15:07', '2023-09-06 10:15:07'),
('2d3b7fbc00a608f5c2f7af4686f2a98a6f25f7ea77510cf5e6f03cd82b5ff8a9b8aabbf60f90fb43', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 10:28:37', '2022-09-13 10:28:37', '2023-09-13 10:28:37'),
('2d4032e256ec6726a6733a2c77a43cc59cd17127b22e147b9628cc7e1db265a04a561b5c15837361', 148, 1, 'authToken', '[]', 1, '2022-08-22 12:30:10', '2022-08-22 12:30:10', '2023-08-22 12:30:10'),
('2e3728b40e3c47abbdff797684f70c99114d28d9bfbe5c11530b7261bc82579cac73099e70e5d30f', 1, 1, 'authToken', '[]', 0, '2022-05-13 14:05:57', '2022-05-13 14:05:57', '2023-05-13 17:05:57'),
('2f12b98b0b06744ffec47b6f236e891dbdf695e6d0521604726daab715d2a4f86f401485a46b9fe3', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:19:47', '2022-09-14 12:19:47', '2023-09-14 12:19:47'),
('2fcfbc1a3ab42fcbfed15ac69a98fbc4adf14b65a6bf901b84841f41600564e90b8aa455c290baca', 1, 1, 'authToken', '[]', 1, '2022-05-13 11:20:48', '2022-05-13 11:20:48', '2023-05-13 14:20:48'),
('3052a4d5b099ab91c473faa943a6c4a3ee0875c97a1d2f062be7e31304c38ae90d55dae6f1acaf04', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:17:31', '2022-09-14 12:17:31', '2023-09-14 12:17:31'),
('311d4ef200627344cdb163c1818ccb3a74c121d06b517e3d18bd6c62a0d865b57647972e3303d918', 148, 1, 'authToken', '[]', 1, '2022-07-24 15:02:37', '2022-07-24 15:02:37', '2023-07-24 18:02:37'),
('3127813aeb9dacd4f44ca28425fcce9cd2e5e7b7369963f3dbba39db0090b98cca75a1a9c6ef272f', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:19:10', '2022-07-09 21:19:10', '2023-07-10 00:19:10'),
('321a66160308556b6f538401555d2f766b716f1ae6edb80dc6007ac8bc649b9b3a7fc54fa2bddfe5', 100, 1, 'authToken', '[]', 0, '2022-07-19 23:01:03', '2022-07-19 23:01:03', '2023-07-19 16:01:03'),
('3231c7a3eb09a5712e0b588d2520b07339851c1df1ebaec4659a764c50644362f0411754b2d66430', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:04:14', '2022-09-11 10:04:14', '2023-09-11 10:04:14'),
('3257c311aa849ee55b9a3cf04828891d7146c6551d1a06655f220fdf44d8c386409d64218215957c', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 11:53:15', '2022-09-11 11:53:15', '2023-09-11 11:53:15'),
('32ee3147c3cb36be100038c52237a95dabf11cde7c9cb26250eb6120f76947b2a6d4978a529f9564', 148, 1, 'authToken', '[]', 0, '2022-08-30 07:04:37', '2022-08-30 07:04:37', '2023-08-30 07:04:37'),
('3393caa02db9ac49b3cf7660c77f635deff2c2595d786bc8a320b8d8b1dc22dfe5f90b584222baaa', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:15:16', '2022-09-15 11:15:16', '2023-09-15 11:15:16'),
('34291dec21419a0b44a7c21878a4c64c4f903347fda08d5891d72a351b67a144a51db47a9841987d', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:16:52', '2022-09-06 10:16:52', '2023-09-06 10:16:52'),
('34942541e284a2ad91127fe9134aec08eb4f759ce4445019ff9c6454fac5dcc7414edac0ca7e5ccf', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 18:55:33', '2022-09-18 18:55:33', '2023-09-18 18:55:33'),
('34ee27b8dd9ed6f552a9407869c21e59d59547d72a07974d7aa45436fe543a5e913e05e482bd35c0', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:11:25', '2022-06-16 15:11:25', '2023-06-16 18:11:25'),
('353d59f10ee37405481b80ca1124abcf333777e54069a44a91b2a96fd3f5a3d696aa58ea237ab6fc', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:10:05', '2022-09-11 10:10:05', '2023-09-11 10:10:05'),
('3571c939596ae03c89d8d38f352bdc81c4da9e073ed0254ca35af60c618a91c4adcc1e12feb14f96', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:55:22', '2022-09-19 10:55:22', '2023-09-19 10:55:22'),
('35ae49d6741c5b9b44b48a62f4595730d142c54be85e4e26b2531c7e8640eb6a7c45873c3aadbf08', 184, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-10 11:42:07', '2022-09-10 11:42:07', '2023-09-10 11:42:07'),
('35b260206565975510a7581750c80a50e545f579b448797ca2891ddcded1401526caacc2067cf6be', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-07 19:40:49', '2022-09-07 19:40:49', '2023-09-07 19:40:49'),
('35ecf678711866cd6e583dccc78f396c22b744181c1244b4390720fe4858d161768e41be46f38384', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:17:55', '2022-07-09 21:17:55', '2023-07-10 00:17:55'),
('368b746a38fa4e3b3a0d4f6a7ab36efc03a4f193d2abf5176e9574365b28f63fd8539eb1e5f4c2ea', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 13:07:32', '2022-09-17 13:07:32', '2023-09-17 13:07:32'),
('3860a3c65102c4f50997938929bdea45aec52806c8a8a6c9c2ef187bb43f59f16788ec238e851ede', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 12:21:20', '2022-09-15 12:21:20', '2023-09-15 12:21:20'),
('38fe38ff2356fc3edb91847e5615788851bf3af7c2588b765b588a70f486f59a83f5f561394bfddf', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:25:53', '2022-09-18 11:25:53', '2023-09-18 11:25:53'),
('3a6b13f748ee0e50f9cfa8bb207ac9dc41106328ec19b653eb130ec67e0422d799263887d4665c20', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-27 16:00:16', '2022-08-27 16:00:16', '2023-08-27 16:00:16'),
('3aae96ea28868cc593a95fca77c20032c0478251eb0b7ecec919dada76b6966d5ad68d41c8c1b6f0', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:58:07', '2022-09-11 09:58:07', '2023-09-11 09:58:07'),
('3b927b611cb9c94f9371c7e65acc1ac015531b1e0f849c2e07b942d2f714a0b2052c210229187afc', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 13:18:40', '2022-09-15 13:18:40', '2023-09-15 13:18:40'),
('3c63bb7864d63726f16334ef39f9825db7bba3d565f29e7d925de4dab7c58674d2aa2099f6fed8bf', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 10:48:25', '2022-09-15 10:48:25', '2023-09-15 10:48:25'),
('3cb9d9c89bcb74af773737aee82226a5df3ef6f09c2df5c012d17b4eed4ade324a5f35d0303dd43f', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:18:44', '2022-09-15 11:18:44', '2023-09-15 11:18:44'),
('3d16763d6de67d61ed4d110f9f6cf33b55411c8ff38e42220f02b57914dff836d189d9ff7e343370', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:26:27', '2022-09-19 10:26:27', '2023-09-19 10:26:27'),
('3d22532ee8ccc781510a68ba6da46d07332a3374d66a9c49e527b7b5c95dc897697d018ae017a3a9', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:38:28', '2022-09-15 11:38:28', '2023-09-15 11:38:28'),
('3d941a88cd7b2a51fba2fc6c6afa0ec6122ba6862c0fd260732963518ee73019c28334b4122e5d1f', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-30 05:18:45', '2022-08-30 05:18:45', '2023-08-30 05:18:45'),
('3fa9b06b7d923bbd314f690608944261f4e582de4008fa1a73026f9231dca006f9aea1ff5d8eebea', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:03:22', '2022-09-19 10:03:22', '2023-09-19 10:03:22'),
('3fc58dbd6cce0050fd50642ad9628cceec5bca2d3a4171df817335d5bc186930b827ae20bbc05145', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:58:00', '2022-09-19 09:58:00', '2023-09-19 09:58:00'),
('3fdc5efbff85f0914387268d7b88964d09c47a876ae6d73b549de44fdbf8ae0a3a0bdacd12fe8ac4', 100, 1, 'authToken', '[]', 0, '2022-07-21 03:37:16', '2022-07-21 03:37:16', '2023-07-20 20:37:16'),
('402811b07ddbf00899821f4b24778a5ca5e7324c89e0bbacf890bbc316b6b69f8ef9e6bc5fd9f8ef', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:53:50', '2022-09-14 12:53:50', '2023-09-14 12:53:50'),
('40e80f987fa678b3f58ec3a8adf27ea743c584654a857e6ad3abc8fdc800d5a3e8140db6509d3e32', 148, 1, 'authToken', '[]', 0, '2022-09-06 09:05:12', '2022-09-06 09:05:12', '2023-09-06 09:05:12'),
('417108fc8ff640aac400f83ca600759819265bba40f91f295626aa2cdd8458f27b8fd3692bbfadc1', 148, 1, 'authToken', '[]', 0, '2022-08-22 10:34:57', '2022-08-22 10:34:57', '2023-08-22 10:34:57'),
('425018b6a6bbb1fed1b4eed28e7c28f5bee8854cef39863f727fd69cb0f4ef15b61540ab5e7e4459', 185, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-10 21:11:46', '2022-09-10 21:11:46', '2023-09-10 21:11:46'),
('42e058bbe8f1de569e3f8fa2f7d70f5ff80daa937e7f902f9a0e63738feb3e4c418de59160238e87', 1, 1, 'authToken', '[]', 0, '2022-05-02 01:25:49', '2022-05-02 01:25:49', '2023-05-02 04:25:49'),
('43195506d028faa023d547fc7340fdc8830eff8c222227c028945e8303c55c3674a08e4ce8c78973', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:07:21', '2022-09-06 10:07:21', '2023-09-06 10:07:21'),
('444cd0dee83a64b80ec7ce40b9dee476361556a12f82f836ec85880d57a974284cd473e9aa18931c', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:10:59', '2022-07-09 21:10:59', '2023-07-10 00:10:59'),
('44623ca96b0e3b754537300343870450db66e51b3b752630b81cc821919bf22ad9717ffbb4e49501', 148, 1, 'authToken', '[]', 0, '2022-07-26 17:10:11', '2022-07-26 17:10:11', '2023-07-26 20:10:11'),
('44c91c87a3aa1ec1a66ca19deaf80df64cb7579b18ddbceb1efe1370fa2a66559b75a55f15f4601b', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 21:57:34', '2022-08-03 21:57:34', '2023-08-04 00:57:34'),
('44dd949cf071b677665947636256cc2631ff22087154ee73ff94bfc34b87ae7449216a41bd77a502', 148, 1, 'authToken', '[]', 0, '2022-08-29 08:45:17', '2022-08-29 08:45:17', '2023-08-29 08:45:17'),
('4521506b9c04e8b3bc6ffc6f61a33211e587ab7dc23db56d79638ca1fc431d623a8d96f4b45f4eb6', 148, 1, 'authToken', '[]', 0, '2022-08-08 13:00:31', '2022-08-08 13:00:31', '2023-08-08 16:00:31'),
('45a93709745b83e9922b37d0af86d97bae5c6385c6be57a34fc4b30b6b050aed4f5c5134aca41370', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 11:08:17', '2022-09-13 11:08:17', '2023-09-13 11:08:17'),
('45c9e6751748974a7289ff06fe051b7634db911dc9ff74f63d492ea4d25023a9b441e45808058869', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:11:09', '2022-08-03 20:11:09', '2023-08-03 23:11:09'),
('45fd8d9217770ccf8439685355b5d0afacf2ed2fbc8e8d08f284661d2c971aac7619427e1df5c59e', 148, 1, 'authToken', '[]', 1, '2022-07-31 13:21:22', '2022-07-31 13:21:22', '2023-07-31 16:21:22'),
('471e9210827fdb4542d816c301084683b76fb4385aa69ed08df9292377837e7c1e4e8d921d8a855f', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:09:15', '2022-07-09 21:09:15', '2023-07-10 00:09:15'),
('4744890aaae54837d887acbb154ea273ac84a3f4eb0c68966318085777c482fc1e87140250dd38fc', 148, 1, 'authToken', '[]', 0, '2022-07-23 12:29:50', '2022-07-23 12:29:50', '2023-07-23 15:29:50'),
('475490ab2d2f6a2f78f8fcff9bf8793e82dfa843e0ada37105bf5d2ff14bb2f7917dcc526d09a93b', 148, 1, 'authToken', '[]', 0, '2022-08-28 09:57:29', '2022-08-28 09:57:29', '2023-08-28 09:57:29'),
('482c3841732c192b76b0c87dea32363d236fae4e5ed65019414679205364eb8652f0be95a2dd08ff', 148, 1, 'authToken', '[]', 0, '2022-07-22 02:32:48', '2022-07-22 02:32:48', '2023-07-21 19:32:48'),
('492c796170b89302a3a413590d1abd81256e171aaefde031f59c412805d8838f9c1c1f518772d839', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:30:29', '2022-09-11 09:30:29', '2023-09-11 09:30:29'),
('4983a028f917eb5663368b766c5f48ca8a0b4edbb210cc2db16a3541b861e49302511e7218ef45af', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:10:38', '2022-06-16 15:10:38', '2023-06-16 18:10:38'),
('49ea117e42abb928123e6b3a4079de4a6c50f928dbf5342d2bd72f1701b9ce2b2f5a0c49d25e3518', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 11:01:21', '2022-09-19 11:01:21', '2023-09-19 11:01:21'),
('4b9e37c0fd10c65b5c882347cd423c8ee1b5cf6fc16c3ba9ef799a4abaaf91963a0fa319d6cd50ee', 148, 1, 'authToken', '[]', 0, '2022-08-01 01:19:19', '2022-08-01 01:19:19', '2023-08-01 04:19:19'),
('4c42478db31c49de4a8f7c76c42f514021ff15104df63026c34191f4f065a673df24a70bc75d181c', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:47:57', '2022-09-14 12:47:57', '2023-09-14 12:47:57'),
('4c785da6d65cbd20bdf91dac7b3b240b18ad0d51096d5cf2e47b69f49d2091910a65a57aa8e7def7', 186, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:19:20', '2022-09-14 11:19:20', '2023-09-14 11:19:20'),
('4c94a669f712d88ac4e01ef2af892cc09b36cf7096937c1281ab9d878060f0ac05e52a4e7085a69e', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 18:14:11', '2022-09-19 18:14:11', '2023-09-19 18:14:11'),
('4eb785da7226f11d7c2da2f1cb0699ef5b71d2fe5450f9227df999a1891267f8ed08df0e568d4a0f', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 11:12:27', '2022-09-11 11:12:27', '2023-09-11 11:12:27'),
('4f9aae90d5f6434eb5d28e9e7fdad65d3d686bd8dbb85d607aebb017ee13e18e3bd723af020a2a9b', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:58:05', '2022-09-19 10:58:05', '2023-09-19 10:58:05'),
('515a06619d1e66466c032afa3831d8336bb3d5900dae60f6cd1061d5e9ab1583a5a7190f969c42e2', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 21:58:01', '2022-08-03 21:58:01', '2023-08-04 00:58:01'),
('5217622827d780e671bd8b754a42d1fe2cdb3c323d5287bee1ba7bc26c3e962517a92702158a13ca', 148, 1, 'authToken', '[]', 0, '2022-08-28 08:44:05', '2022-08-28 08:44:05', '2023-08-28 08:44:05'),
('5320d74660ec4941b6b1d7b9ebf53f8382d57f23ad030efa1e296712a15e97374a781d181842689d', 100, 1, 'authToken', '[]', 0, '2022-07-19 23:01:24', '2022-07-19 23:01:24', '2023-07-19 16:01:24'),
('539ca746195724e1ccbd19d2a94ce514bb5fc030d6c716468dc6adfa5e69f9758ab70587c0a08f11', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:13:47', '2022-07-09 21:13:47', '2023-07-10 00:13:47'),
('547182ce3a0eec310e86107f28c02548b7a6a3718a28102185a9eee6f39c063143d93f828e3e82d0', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:53:27', '2022-09-17 10:53:27', '2023-09-17 10:53:27'),
('553c0ceb1117881f447ce03610902bb3270437889fc863cec1a137a901f72e097e18ea9763182c9c', 65, 1, 'authToken', '[]', 0, '2022-06-16 14:54:31', '2022-06-16 14:54:31', '2023-06-16 17:54:31'),
('553f3f94fa5eba5ed39ca484c5b8dd160a998d044c767faa5b1e267dd1efcb38328bb741d00aea93', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:28:04', '2022-09-14 11:28:04', '2023-09-14 11:28:04'),
('561225682529a9a12a284f3021b23e4556f5d65c72e618d72f40c1c4cf09ac4b0714d34db9330e2e', 1, 1, 'authToken', '[]', 0, '2022-05-02 01:41:16', '2022-05-02 01:41:16', '2023-05-02 04:41:16'),
('56a8562cf0612684392cac501b37e7329944752f6c5efd1a334ea0edbe203868193143b8629045f3', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 22:25:07', '2022-09-11 22:25:07', '2023-09-11 22:25:07'),
('570ed88404db56c46f14d89033eedf908a1b8b11dd3f3c905c1608f392dfe614466b2855c93663e1', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 12:51:38', '2022-09-15 12:51:38', '2023-09-15 12:51:38'),
('5778564388cf9a7532fba53c94be0a6446c42e1770267c8f15be300fa948e26906c4e84c422091c9', 1, 1, 'authToken', '[]', 0, '2022-05-01 13:28:32', '2022-05-01 13:28:32', '2023-05-01 16:28:32'),
('578a6864c0536030535b271f316750e80e6b439e6e516c65cb484fad580116de2b85c2c89ce80a7c', 1, 1, 'authToken', '[]', 0, '2022-05-13 11:13:58', '2022-05-13 11:13:58', '2023-05-13 14:13:58'),
('57f3832749391fb428d5640f3367fc7e17de95c525c491c3cdb54c9c62c29a471a39adc2241fb680', 148, 1, 'authToken', '[]', 1, '2022-07-23 12:27:17', '2022-07-23 12:27:17', '2023-07-23 15:27:17'),
('586d225f7099b99101bdca49ca0cce57cd7a6955c7b92b6d2170e5e41229b2bdb9261a9217667f92', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:57:06', '2022-09-14 14:57:06', '2023-09-14 14:57:06'),
('5a83dba29ee66fedee2ec46565b20454f066bc11340b5a8f849144033862432e928c3add6884b6e0', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:04:00', '2022-09-11 10:04:00', '2023-09-11 10:04:00'),
('5b1f8c72c663324b1880d62d3f617bdce2407c44d7114bb33f52278bbd4b5c1d275fae2d6e100649', 148, 1, 'authToken', '[]', 0, '2022-08-22 12:48:52', '2022-08-22 12:48:52', '2023-08-22 12:48:52'),
('5b7a90e49d90f7ec7c5766f96d309d3ab9d6440cb0e2dbd2976c2e95ee7059ac6cd124beebe92972', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 15:53:56', '2022-08-28 15:53:56', '2023-08-28 15:53:56'),
('5bc89d381a474a9d9baccbbf08cea4cadef5a6b68c16345b443715e21e9a453c30d9b08fe01b5701', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:26:08', '2022-09-14 12:26:08', '2023-09-14 12:26:08'),
('5c1067b66e79aa9cb93c982834f5b90f4db70d08cadac005cbe26a801d052b81f12b8f859bde260e', 190, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:39:56', '2022-09-14 12:39:56', '2023-09-14 12:39:56'),
('5db93a6a1dc6bcbd3d34b0a1be888e3bef4d61a3a5674c2c0460274dcddf2bd23c92a4c745c48bba', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:16:11', '2022-07-09 21:16:11', '2023-07-10 00:16:11'),
('5e28192685ff977ec0b7eab373be1f7a379f1d96ee353dcbcb0d6d9e1341e7dbe51d2dcac05f102e', 100, 1, 'authToken', '[]', 0, '2022-07-16 15:26:01', '2022-07-16 15:26:01', '2023-07-16 18:26:01'),
('5e84579149f8f866018790b3b13afeabc07e4edd3b96e938696aaab5990e055804a349d53f713362', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-03 22:19:06', '2022-09-03 22:19:06', '2023-09-03 22:19:06'),
('5ec4158466fedf9641748ea6e4e75287dfebfcd07589d7fe978599dfb5d5f9d8a9d98dc5968134d3', 148, 1, 'authToken', '[]', 0, '2022-09-07 17:15:26', '2022-09-07 17:15:26', '2023-09-07 17:15:26'),
('60e63367aaadddf6207eeef6079b3cfb6d75e9d5ccf5e82334868957bc1b6afcc0f9b9f17d3d1cf4', 148, 1, 'authToken', '[]', 0, '2022-09-03 20:03:36', '2022-09-03 20:03:36', '2023-09-03 20:03:36'),
('60f26a8ff5d0e978886300388e5a2d04bb2c19b4b699ae9b86c65de72e80b8486c7730c92e7e81a1', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:16:09', '2022-09-15 11:16:09', '2023-09-15 11:16:09'),
('6259d2138859c5236c50a428fc63ee0a143f23a839ee9fbd8b31893a606ad38f2854a01dc807292c', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:38:29', '2022-09-17 10:38:29', '2023-09-17 10:38:29'),
('630f3611b63f03cb5c05700a48828af63c383ad68fe3023cf727025348ccfc254b0064a2cda7a604', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:04:32', '2022-08-03 20:04:32', '2023-08-03 23:04:32'),
('6324f0f2b77e78bc879666095de6fb1ccc6eadebc2d44a56d48052c04a7023ac28455c79c8403ecc', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:53:39', '2022-09-19 09:53:39', '2023-09-19 09:53:39'),
('63a311c913a82efad199761db533bb2d649f62cd9848bf327f673fc2851b0de9376901fa460e775d', 1, 1, 'authToken', '[]', 0, '2022-04-28 16:22:28', '2022-04-28 16:22:28', '2023-04-28 19:22:28'),
('6458a6970cf633b441cab7b81718279848646a6971cc16903b77435b487acada3a3800c6b8c137ef', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:10:26', '2022-09-17 10:10:26', '2023-09-17 10:10:26'),
('64a2a2acb3cdad866fa90064d1ddf47c3317325da2436d9147139d3cad9a1cb5e1153e691c842bc9', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:07:52', '2022-09-11 10:07:52', '2023-09-11 10:07:52'),
('64beb40c20da12a38a343c88f678c58b42a8977e4ff2283e789170ce542ef5ea2e87545d5b0e7449', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 21:54:51', '2022-08-03 21:54:51', '2023-08-04 00:54:51'),
('64d8f85eb1fda6d66f643a0946ac301b454357b91621c096d17acd2c153e4c6c62a522794884df3b', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:07:14', '2022-07-09 21:07:14', '2023-07-10 00:07:14'),
('64e48622cc6638d7fd421a318a1f55182e7169fd6f44905cb0998c27b566eece66ffe8cf25370693', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 09:36:42', '2022-09-17 09:36:42', '2023-09-17 09:36:42'),
('6503d9b825f56a7c869586a0c8ff467f24ef346e900a88105801de2ec2887f610f16e402063547c0', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:29:37', '2022-09-18 11:29:37', '2023-09-18 11:29:37'),
('654689294e6151a706518c3a6bc6e4769acb720b9485d903de3dc8787d3499b2ecfa0dfcd070e1a6', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 14:08:29', '2022-09-15 14:08:29', '2023-09-15 14:08:29'),
('65a42de995868f60af87e0a0d61cf6aa7eaf1bc7b84858e0e90b09d928da516895217d9b72433eee', 148, 1, 'authToken', '[]', 0, '2022-08-03 15:28:17', '2022-08-03 15:28:17', '2023-08-03 18:28:17'),
('65ac545e9bed45d976e26a5b9e1b7308e86f1c8a577c1abf2e84dabca9313536b776d674405f7603', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:33:18', '2022-09-14 14:33:18', '2023-09-14 14:33:18'),
('65fbc14979193094dea519bf9d198bf8f3160fa5c1ff7a1660124cb2121fc6239c24b74c2a3ceeaf', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:58:46', '2022-09-19 10:58:46', '2023-09-19 10:58:46'),
('6692b24bbc81a6ddb5a5f184c3ece5d3e9ee7889562cce94d8153c3d93d199265436ce8d33da03f6', 148, 1, 'authToken', '[]', 0, '2022-08-24 05:23:21', '2022-08-24 05:23:21', '2023-08-24 05:23:21'),
('68564ffe5eac611bbdf2133237685851e29739dba62e1bcadf8c78d3ed0b7b41fb8ab6a98175e038', 148, 1, 'authToken', '[]', 0, '2022-08-03 15:27:38', '2022-08-03 15:27:38', '2023-08-03 18:27:38'),
('69879fad2cbc1d4f58ce427cf0297d5c1bcd9cbbf88c74785563c036aa51433c104cdccd9ac6f358', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:33:14', '2022-09-11 09:33:14', '2023-09-11 09:33:14'),
('69d240aa188066580af9150134104dc440cd09bd217360ed89648ffdcfd39d6441e0dfb139547217', 171, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 12:50:44', '2022-08-28 12:50:44', '2023-08-28 12:50:44'),
('6a079d946729fab444dd025c2ecfa6a71c41260f6b283db8fbd8e9213690c90c9023f82225169475', 1, 1, 'authToken', '[]', 0, '2022-06-11 07:40:25', '2022-06-11 07:40:25', '2023-06-11 10:40:25'),
('6a1e428b5752e20e2ef3bc50a07862818c55e90c27770ccd5a8af952f7af980898ee9411c8cccb78', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:39:12', '2022-09-19 09:39:12', '2023-09-19 09:39:12'),
('6ab5158ce555b4519ee95a4d5ca73417d79225e6d6fd1d3f8b7bce839320a15ae3001aab94d6f8c4', 148, 1, 'authToken', '[]', 0, '2022-08-16 15:47:49', '2022-08-16 15:47:49', '2023-08-16 18:47:49'),
('6b818c2cb3d60d16e79f01c517d25d2a6d9e76c8a0652c8d0fdbf35860f44fcdf351659ad10d035d', 1, 1, 'authToken', '[]', 1, '2022-05-02 01:33:48', '2022-05-02 01:33:48', '2023-05-02 04:33:48'),
('6c2a0a29ca7ab11480fa12ea3275d91a10402e361d43da89fdb01b53cafe355283aa3f52db53d2e6', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:10:55', '2022-06-16 15:10:55', '2023-06-16 18:10:55'),
('6caeab289f3292d2db8f22300733fb95772f3e6750f0c0e3b80e166982b218a082a24d7854ea973f', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:54:19', '2022-09-11 10:54:19', '2023-09-11 10:54:19'),
('6cc6c0501ac6df13b476d45712923e7bc7b522a3e047b284927bd71120cd8e2588969a31f8c29d03', 100, 1, 'authToken', '[]', 0, '2022-07-10 05:12:15', '2022-07-10 05:12:15', '2023-07-10 08:12:15'),
('6d2a8acb9bfc03eb51d66cbc3929d3ca0d89b7b5db1fa7989913fca93286013f98b9961f72f4121b', 100, 1, 'authToken', '[]', 1, '2022-07-17 15:59:02', '2022-07-17 15:59:02', '2023-07-17 18:59:02'),
('6d38770606498a131be9df15c9de3a105e6b1450d5c0753163a9eaa9c50e223631af4208a568875e', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 08:29:18', '2022-09-09 08:29:18', '2023-09-09 08:29:18'),
('6d43b1b9450ecf1696e32cbfa72aaa791c4939fea900f2cf6b8df64db6bfab2684e2cb7c3e3778b4', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:20:09', '2022-09-14 12:20:09', '2023-09-14 12:20:09'),
('6d4b3688f13242741895454c2e8d8e6aa7ed27c7b7cfd3c6778fd4a170ef46e26d77478f8580f0b2', 189, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:30:28', '2022-09-14 12:30:28', '2023-09-14 12:30:28'),
('6d70da871854a27c2c2900a09f0fcc85aa2c5b1e01e6d58f1eccfd2d0fa798b654890c0c0338ab26', 148, 1, 'authToken', '[]', 0, '2022-07-24 10:54:46', '2022-07-24 10:54:46', '2023-07-24 13:54:46'),
('6da493d788053f5d433588057eb54a3e18cd17832cb03a3587dd81980b779037b8d372ddcd956be0', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:52:43', '2022-09-19 09:52:43', '2023-09-19 09:52:43'),
('6e50b4ef870a0e338d8e975667357606e3cbf41800722fe0d3cf6635856ccfe2af67ad924a00a1ef', 148, 1, 'authToken', '[]', 0, '2022-08-24 17:35:43', '2022-08-24 17:35:43', '2023-08-24 17:35:43'),
('6eafd8c62e614ff5c6d2e5b34b175dc7f2ade062a280e0d16320c95030de92d847bc89117e72a953', 1, 1, 'authToken', '[]', 0, '2022-05-02 01:15:53', '2022-05-02 01:15:53', '2023-05-02 04:15:53'),
('6fbcd748c7a817174defedf9817ba4384198c51457f12ac1c6699e01d06ae1107602a01382008407', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 15:49:55', '2022-08-28 15:49:55', '2023-08-28 15:49:55'),
('704c5c11d009bd3b19843ff0c515c1b2e02ef188794dbe5db7f8729027071f9856c2600af3913b33', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-08 13:19:32', '2022-08-08 13:19:32', '2023-08-08 16:19:32'),
('70b201f58755f09fb0093e93fb0947f4303164f19a3431a96d825d5dbc9ea62a855dadf5e521fb2a', 148, 1, 'authToken', '[]', 0, '2022-08-29 17:40:01', '2022-08-29 17:40:01', '2023-08-29 17:40:01'),
('70d4b7102e7434c5bd319c83607b74320c8bdae96f45942ecaadabc94ae5d1252280daedc4090f57', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 19:35:52', '2022-09-19 19:35:52', '2023-09-19 19:35:52'),
('7156f0ed60ca90426f89c777f1c83c7f9c547004b87f1af01efec479f0e053933980f8072944885f', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:45:19', '2022-09-11 09:45:19', '2023-09-11 09:45:19'),
('716eab65cbfe429558943e4b77d5e09b0ab9eeb1a0f081de9ced127591b91508a6a6e209343319d9', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:30:59', '2022-09-17 10:30:59', '2023-09-17 10:30:59'),
('7197d9b27d5720f00779ccf03f81a6306d3f92c7c117184b36479fc78f82d8167add72f7eb296144', 148, 1, 'authToken', '[]', 0, '2022-09-05 12:15:44', '2022-09-05 12:15:44', '2023-09-05 12:15:44'),
('71d84ab5c12f9ada08411f40f3e17d339f4ca8cde5491804f69147537f9cfd879ee575d94b3cf707', 148, 1, 'authToken', '[]', 1, '2022-09-04 18:12:32', '2022-09-04 18:12:32', '2023-09-04 18:12:32'),
('72523ee78963e6590e545adcfe7d8e75eb4186a1654109a72855d24b7ebc66998a5d5d17859a2a75', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:24:56', '2022-09-14 11:24:56', '2023-09-14 11:24:56'),
('73a791e950fbe00361b3a317532a5529e2d4c830822cd02dff7cb22fbf82041f511c2c63983823ce', 1, 1, 'authToken', '[]', 0, '2022-05-30 12:04:49', '2022-05-30 12:04:49', '2023-05-30 15:04:49'),
('73da5815c5557704625cd82de4dfa5a19c2257192361fd8e59962ae106091deb2944638e60c461d4', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:51:12', '2022-09-15 11:51:12', '2023-09-15 11:51:12'),
('73df2174d5bdf9a72c332f7dd94307572150faef28ff31e667c0d0c2183f6059402101bfde3399d7', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:57:31', '2022-09-11 09:57:31', '2023-09-11 09:57:31'),
('742bee5e45681e6f75726b8abc6a6843ff6742a6d32debe659b9d3be7303e6777577fc056e85450f', 184, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 09:22:57', '2022-09-12 09:22:57', '2023-09-12 09:22:57'),
('744776490c612d604de80b095a1daf0a1db1570771df957a42442771f8ff4d81b2d7769fa899e6cd', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 20:13:24', '2022-09-12 20:13:24', '2023-09-12 20:13:24'),
('762e74b41d7f8cc8c35ab7e08ce656f7ff3f42b5db5c6e4c9a666c4bd3eafb091782d13414cc74c6', 58, 1, 'authToken', '[]', 0, '2022-05-01 13:28:00', '2022-05-01 13:28:00', '2023-05-01 16:28:00'),
('765dd0f20ef9eb77cf1328da3b5f6fa6fdd2c9056cfc768ab6afe193f8bed9afc85ea848e9ff724b', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 11:10:56', '2022-09-13 11:10:56', '2023-09-13 11:10:56'),
('77161006de080cea450e11baf859ecf9f95cee919f310538b0bd8eaacc97cb3882c3be8bedb92f87', 148, 1, 'authToken', '[]', 1, '2022-09-06 08:53:12', '2022-09-06 08:53:12', '2023-09-06 08:53:12'),
('786bf7ca66add87df95ea9f220ce4b6619bf3dd407cadb8a0d1f921d3ccce6a6cb69c4230b2c8eb8', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:17:42', '2022-09-14 12:17:42', '2023-09-14 12:17:42'),
('7886518cfc6a5b1f615b7c6aaac40696840e8a684e53a1e54bcd490bf965f128748172fbbb7f7242', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 22:04:13', '2022-08-03 22:04:13', '2023-08-04 01:04:13'),
('7992d2bfc61dc2735fa0d9e5b466b6500e63781a891c3471b8f7e6935b5e9395a105f857631f6f53', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 14:08:18', '2022-09-08 14:08:18', '2023-09-08 14:08:18'),
('79e6428f01c8467d26f76a275070e01966f0cc9df8b5c099d557c865f4497008faf6b89f218c6c2b', 148, 1, 'authToken', '[]', 0, '2022-07-30 16:48:07', '2022-07-30 16:48:07', '2023-07-30 19:48:07'),
('7a411e317536b04c2c137049cf1275af0f4354c780f8f632ad6f66d42451dca3a9f08787e2e0fbea', 148, 1, 'authToken', '[]', 0, '2022-09-04 15:45:09', '2022-09-04 15:45:09', '2023-09-04 15:45:09'),
('7a6601b99412f25a63a3ee25d48fe94acb02ab0c9f5cb86abddd6f83faa3460fd0ff1ae06ba66ce8', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:26:44', '2022-09-18 11:26:44', '2023-09-18 11:26:44'),
('7ae4310e139d3acf025178fd390cb4fe41bf119a25e3d571c1e0321835bfcb45bce6f962596d52a8', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:27:46', '2022-09-15 11:27:46', '2023-09-15 11:27:46'),
('7af9b6a6c16fda0e33391c1f6470299e8e27eab9682702aa23a94b9bbb435e6c8e11a5bf4166c88e', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:09:51', '2022-06-16 15:09:51', '2023-06-16 18:09:51'),
('7c3f2a249d2e4ac5beaee03a8ab24c061f91b0678a1523886a7a769f79276ec0ce0f266c93b291f8', 152, 1, 'Laravel Password Grant Client', '[]', 1, '2022-08-03 20:32:04', '2022-08-03 20:32:04', '2023-08-03 23:32:04'),
('7c3ffc4b2475517453927f4d22303208d105767cab6cd3f9a789a2cccd0b3f5e5744338f2d744ab4', 148, 1, 'authToken', '[]', 0, '2022-08-24 09:20:43', '2022-08-24 09:20:43', '2023-08-24 09:20:43'),
('7cbafdab14a54301653c4b6934501327bd7e22b09ac609697950b12dee3f4fc3373b1bc600b8e403', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:29:53', '2022-09-19 09:29:53', '2023-09-19 09:29:53'),
('7d1abbcd8ffc7c13649641b231056a5705b9360f6f3c6dea65a157e8d66779ae2356f84a3e03bdf2', 148, 1, 'authToken', '[]', 1, '2022-09-07 05:07:40', '2022-09-07 05:07:40', '2023-09-07 05:07:40'),
('7d6adf1ed22d81b0a9e10f5f5f905c18031f4bd79cb94d946c50521652b5e080223b8b5a2fb73e78', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:01:03', '2022-09-19 10:01:03', '2023-09-19 10:01:03'),
('7d6b8c90384c4180dfe2749bbe8b26a53910f1523c9ab8cb2a27f2f5a61343e25f33babec2b7f7bb', 148, 1, 'authToken', '[]', 0, '2022-09-07 05:07:10', '2022-09-07 05:07:10', '2023-09-07 05:07:10'),
('7fe45fa0c062d1fdd06ea943fdf2b89d3387f107446a10fa50d70848dc923d820c136fa59687142a', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:13:56', '2022-09-15 11:13:56', '2023-09-15 11:13:56'),
('7ff234e812ad500748a8d9caac8b0de490d583e13ce7842d3660fb55cfc4883b6331616cb997751f', 100, 1, 'authToken', '[]', 0, '2022-07-11 05:45:25', '2022-07-11 05:45:25', '2023-07-11 08:45:25'),
('80c553b3729a7d3a417c8f02ba7007645800f9140eb9e3833fa04d58b3492def91af8669112b97ff', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:41:34', '2022-09-11 09:41:34', '2023-09-11 09:41:34'),
('81251c8540c47a0eb4637e74e0f900ae040c9d07959a85962886273a565de3c16465a0feb37bfa57', 181, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 03:45:41', '2022-09-17 03:45:41', '2023-09-17 03:45:41'),
('8138ba08200f3479d33cbecaa520132cacfe3c4edde9922dacf27998d146618785d51a6bb4954951', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 12:21:45', '2022-09-11 12:21:45', '2023-09-11 12:21:45'),
('81d1de550ce6598c414c21e3ba2dad2437c0a14c647deab68cbe2bd9698abd37139e7fcb028cc3ec', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:52:24', '2022-09-17 10:52:24', '2023-09-17 10:52:24'),
('836fe3f23e9aa1a2420c46adafc237f2132503e4f36f3e80c1bb702981153f669ca4b5f4c0a44057', 148, 1, 'authToken', '[]', 0, '2022-08-24 10:32:04', '2022-08-24 10:32:04', '2023-08-24 10:32:04'),
('83b5a6134e7d3fb15aed04a9e8457c393fb30981157735c617b226fd84564af98b0dce9d1f826488', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:10:21', '2022-08-03 20:10:21', '2023-08-03 23:10:21'),
('8439c291443f4f01868a2627e6e3879364847170bb6add06ba747c2cd69ab1817a67b287c91edde8', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:15:37', '2022-09-06 10:15:37', '2023-09-06 10:15:37'),
('84864afaa0f631a845f876c0a31f10cbef4a455fe9ce6e5d60c7bda3f33d340e747e8ce69e48b64f', 160, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 19:54:47', '2022-08-03 19:54:47', '2023-08-03 22:54:47'),
('84cdc80f1e7e0521220baa497419dbb510f4ada1771c74e6eb1415d7af4189f30acbfbcb953abe94', 177, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:29:52', '2022-09-18 11:29:52', '2023-09-18 11:29:52'),
('84dd56c414dfc3bf5038c04cbbd0b18896ec59df4914e36c7fada436746716e6050d4a0687fc495d', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:12:48', '2022-06-16 15:12:48', '2023-06-16 18:12:48'),
('8560356fca0fe4dcfbb2811dfabfef1dc4dcde04dd603e9eb3ecf08189017b678deec37bb0f0b3b8', 100, 1, 'authToken', '[]', 1, '2022-07-10 05:14:23', '2022-07-10 05:14:23', '2023-07-10 08:14:23'),
('85ffdcc379543b30dec523d323fe86fd37a85bb1cec08ecadd4bdd5219535de62cccc1bb2edee8f5', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:09:16', '2022-07-09 21:09:16', '2023-07-10 00:09:16'),
('8684b2357495027cae450dc2b42d87adcaf5334a59013e36d6da250b49c03976e3b4d1d432788bf0', 148, 1, 'authToken', '[]', 0, '2022-08-15 18:10:08', '2022-08-15 18:10:08', '2023-08-15 21:10:08'),
('87946e311aa30397f0fd426e911f956ef9a7dd8fc78227e0626fc67262699acdc2cc1055b070493c', 100, 1, 'authToken', '[]', 0, '2022-07-10 05:10:21', '2022-07-10 05:10:21', '2023-07-10 08:10:21'),
('880c09e2ba6308c64de9748a72cc740e2258b395c98772a1b256d31e6b132c851945b0f31e7f4cc8', 65, 1, 'authToken', '[]', 0, '2022-06-16 14:00:34', '2022-06-16 14:00:34', '2023-06-16 17:00:34'),
('89cb76fc3c39703fa66a9475be35eda36acf76eff81f94f1d2a8c9fbf289e87b8cb96d20e2201229', 171, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 10:14:15', '2022-08-28 10:14:15', '2023-08-28 10:14:15'),
('8b407c28c0bfcbfd4b5cea6b1bea2881739b96a59f3da649b6cf4a2f196b6f4604b3f98de48dee66', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 08:56:59', '2022-09-19 08:56:59', '2023-09-19 08:56:59'),
('8cc17671c8cee218db74106e946138343cec13e670a4ac0000238acdca565a74d9fdc53210169fa3', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:31:26', '2022-09-19 09:31:26', '2023-09-19 09:31:26'),
('8d6f3beef98ad8d3e4b4ee1122157b96315fdb5248a1a4737df4b854c171d520036a1eb7ea99cb50', 100, 1, 'authToken', '[]', 0, '2022-07-18 14:46:36', '2022-07-18 14:46:36', '2023-07-18 17:46:36');
INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('8de44f7ae339d2afc77dcd5cc39f67bb381184f49da7973b0d95fd8a86222c114903296da4c2382f', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:04:33', '2022-09-11 10:04:33', '2023-09-11 10:04:33'),
('8e1ac0e20e8353d970b82e1294aa7ce1ef8012d6b71354d5706a68623042f3a09dc1038cb3fec7d2', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 09:36:36', '2022-09-11 09:36:36', '2023-09-11 09:36:36'),
('8f6aa20c806335d0f37d65f158e6b4128a55a9eeaa35309aa839c65469ff276c60a927272711560d', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 11:01:53', '2022-09-13 11:01:53', '2023-09-13 11:01:53'),
('90bab0b98b291a308388609ef86e9e44bf44da4122b008870b16698a7ebf2746eb5d07e21433bb1f', 148, 1, 'authToken', '[]', 1, '2022-07-30 17:00:23', '2022-07-30 17:00:23', '2023-07-30 20:00:23'),
('90e53880359ea87c52dd0284c0de0eb51dac0ea72129968edd8f1d5be03a31ca8829a66e582e167b', 148, 1, 'authToken', '[]', 0, '2022-09-05 05:37:44', '2022-09-05 05:37:44', '2023-09-05 05:37:44'),
('9270d6c1de3b5260959bf5747d80cfe52d172ca84d2266df2f927fb8540d733c59c270bfe42c6dad', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:09:21', '2022-08-03 20:09:21', '2023-08-03 23:09:21'),
('933a68be3e967c41f4b5d0debe7115d19e8738dd57952cf9b2038370afe5ba8fccef4a0b6bd41e49', 148, 1, 'authToken', '[]', 0, '2022-09-04 08:12:36', '2022-09-04 08:12:36', '2023-09-04 08:12:36'),
('935dd62c8ecfda9ffe269fc90599653fb958d38b2887a6d3fdeba8b00595bf45f5f80c96803c81f9', 184, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 12:05:21', '2022-09-19 12:05:21', '2023-09-19 12:05:21'),
('94835a772b585e5764f05e1dca0c653899814312bb285791710186b7f9fefca97b4e74c5d8ca1f87', 1, 1, 'authToken', '[]', 1, '2022-05-01 13:33:38', '2022-05-01 13:33:38', '2023-05-01 16:33:38'),
('94ff64e535d12bddf9c1325320c7a322227ece61c8b6f9e029d244a9c58e88106fdf57195991068e', 171, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-28 10:15:26', '2022-08-28 10:15:26', '2023-08-28 10:15:26'),
('956b4c43df3a54e82ba14fe9db9de964b9b566e1bc01d79664660f9b8ca435a3a051d01541c111ae', 148, 1, 'authToken', '[]', 0, '2022-07-24 14:11:21', '2022-07-24 14:11:21', '2023-07-24 17:11:21'),
('961460af9163e64fcd641c8306c271f30d7f9ce3707b03e4ff609dec1890ebbbdfafa826c0e371e3', 183, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:49:32', '2022-09-15 11:49:32', '2023-09-15 11:49:32'),
('965d4f0ed301aa84f5f4dbdf082ed8224a83d3f4915164d3968befbf309535bf2f9adb9df14fdb18', 148, 1, 'authToken', '[]', 0, '2022-09-04 18:22:30', '2022-09-04 18:22:30', '2023-09-04 18:22:30'),
('96e8a49770ef69224c8ce103991a29f87a80af9d4c9034a6636cb5f657a4ca4f0ce094fa4138873d', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:28:05', '2022-09-18 11:28:05', '2023-09-18 11:28:05'),
('96f915d57db9182207afee369a064a0edb00a353db3083a32355197c5039932fd45f8ddd0d3e4274', 191, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 19:01:54', '2022-09-18 19:01:54', '2023-09-18 19:01:54'),
('9702aa5e4a6dcd79405e60b057a7459696cb4476177d44afa8ef7ab070436f33e5cb0326a191a2d9', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:12:28', '2022-08-03 20:12:28', '2023-08-03 23:12:28'),
('974a6d9c728799917510d04d2e403e0f78598a22bb0ef9225b3a165d0142460db01dee1bcf372bc9', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:17:08', '2022-09-14 12:17:08', '2023-09-14 12:17:08'),
('974f4c1582509bb51f5672904d74205ba385ad9da5f7ce4f6f8c87407460233b05501d34dd38c72d', 1, 1, 'authToken', '[]', 0, '2022-05-13 11:16:41', '2022-05-13 11:16:41', '2023-05-13 14:16:41'),
('982e585beda1e73b54bb83309e4bd1ac1feea9187755417a9b5154277c07362c0a8f75ddb2eeb6f3', 148, 1, 'authToken', '[]', 0, '2022-09-06 07:55:57', '2022-09-06 07:55:57', '2023-09-06 07:55:57'),
('98527a77e98234863668b6bcb21b65aac7b185c5e7bc277919b590ff8eee98da482768b834703d8a', 181, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 13:37:06', '2022-09-08 13:37:06', '2023-09-08 13:37:06'),
('9894d7242a74557bb87b1ff60ee148a5542fb4796110be73a84b79efe031b2e8d3e91a295aac62c6', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 11:07:41', '2022-09-13 11:07:41', '2023-09-13 11:07:41'),
('98a936f8cea7680b9fff7ca15187ca6cd70ae3642af72b0552b7fae7aa639da21d915ad3de0a3121', 148, 1, 'authToken', '[]', 0, '2022-07-21 12:23:28', '2022-07-21 12:23:28', '2023-07-21 15:23:28'),
('98fa3c98afcb22ed5a2f1a5814a70fecf8c1c49db123031229eb56992d6a8f7a49acd7e6128c7cb0', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:19:06', '2022-09-14 12:19:06', '2023-09-14 12:19:06'),
('9922a7a2814c7a9707cc3685f9e26df880cf2cda44bed2963bc5e07af2c02670a83f2f84c0f2c91e', 171, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-29 11:58:45', '2022-08-29 11:58:45', '2023-08-29 11:58:45'),
('993c6126fdce7c1dbb78e03af9c158b3a1a2b93d16d0a26004094f4c0a396f90273cf5e419b7ec0a', 152, 1, 'Laravel Password Grant Client', '[]', 1, '2022-08-03 20:19:06', '2022-08-03 20:19:06', '2023-08-03 23:19:06'),
('99dd24d80a95b31f62029c86be830a190aa2dfebacfb7f3031afb804edc59cb47ea62fdfc3c9bbd6', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:27:17', '2022-09-14 12:27:17', '2023-09-14 12:27:17'),
('9a0e84a460f2a57ebd9041714082df0dd3219bf8aa19795595f1567698cefac38e74342b610504c3', 148, 1, 'authToken', '[]', 0, '2022-07-31 13:21:32', '2022-07-31 13:21:32', '2023-07-31 16:21:32'),
('9aa3a84cf0fe7b64acfdd6f3d61a4ee83d7c1563c6e2e5cdb89a3c155f60b6d87cf3b91a5b3d5412', 190, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:38:59', '2022-09-14 12:38:59', '2023-09-14 12:38:59'),
('9b45033523a52f24954e4f2061f0a3a54b09a279b35f4772415c5604be72058907969b8a214e8316', 148, 1, 'authToken', '[]', 0, '2022-07-21 21:42:02', '2022-07-21 21:42:02', '2023-07-21 14:42:02'),
('9b5908baa6fc187c0f351a06507f5ebaa07d14c77331fa38530d3215425fddf5d5acb362b25eee48', 148, 1, 'authToken', '[]', 0, '2022-07-21 13:50:10', '2022-07-21 13:50:10', '2023-07-21 16:50:10'),
('9bb533eace499c0495bd5b8ecf014ef6e71171e73c9b353b3ace278c3eaa6f6dc9f3c76a9e327b72', 148, 1, 'authToken', '[]', 0, '2022-08-23 19:43:18', '2022-08-23 19:43:18', '2023-08-23 19:43:18'),
('9c1c1f1009173befa8959bda6a10ea74a868ed3393d43953d7644b520f10c61a6795461e36b45d88', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:55:30', '2022-09-14 14:55:30', '2023-09-14 14:55:30'),
('9c607bcea5ce7f2818f929d2d71251eef23d099a212e9e32206d26534256f13cd00733754464cff3', 148, 1, 'authToken', '[]', 1, '2022-07-23 12:29:12', '2022-07-23 12:29:12', '2023-07-23 15:29:12'),
('9d0f44aadd3941c52a7724e93fcc17c2703c78f1c006ae9360d236d8cdb43886a0a9e39f117cef38', 100, 1, 'authToken', '[]', 0, '2022-07-16 15:26:00', '2022-07-16 15:26:00', '2023-07-16 18:26:00'),
('9e83f89b19bcf69cc0a340794f850f89c3ae11f9d15e1c10cd4e1000fa812b1b2a562cb111b91627', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:03:22', '2022-09-11 10:03:22', '2023-09-11 10:03:22'),
('9f6a49b1ec74e228f467e577c3f4f1e6c91c83276b0b3eace788611033706faa71fb57583fdb5b31', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:28:20', '2022-09-18 11:28:20', '2023-09-18 11:28:20'),
('a03a51e18813180ccffad3371e28124dfb36f1f7034558309fe65a9f402c02fbb4f5e343864e1942', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 09:07:13', '2022-09-13 09:07:13', '2023-09-13 09:07:13'),
('a0fda9bebd3125a3a1aba0af0fef2823085653b3c182cccec45c30d415760f0d537e29a87c143614', 181, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-10 00:37:58', '2022-09-10 00:37:58', '2023-09-10 00:37:58'),
('a1db7dd161c93163198aece26a7dd00d9aebc0aa425dd996f5e3e0bee21129a7f37e235d76a8f71e', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 11:45:43', '2022-09-11 11:45:43', '2023-09-11 11:45:43'),
('a32e78b54995386e8eac9ce824ec9337325119a37a96d84b49e5a11d355705526bd9ca19bf8d71cb', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 06:13:51', '2022-09-08 06:13:51', '2023-09-08 06:13:51'),
('a4e466fc9de0c083fc7be022dde3e7dd57b8cfe307cef1a261c5c4b57146fd4f6c732996ee7c42e4', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 09:51:44', '2022-09-17 09:51:44', '2023-09-17 09:51:44'),
('a5554e3239c5746533e461b941decb66bdca5d674b222c4fd3aa479833b3f22e23c1d8b945243355', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:51:46', '2022-09-14 14:51:46', '2023-09-14 14:51:46'),
('a57f4d6011d271fa9e58ac94df826a3a48beb1f54cf2ee57e5551b0747317dfd9eebf3a9df35f6ca', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-03 21:58:28', '2022-09-03 21:58:28', '2023-09-03 21:58:28'),
('a5fe8531a2233bc635096e6107fb1f08ef16b3828389fa588f6ca3b1ed240c7cf08b446cda08fc79', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 14:27:25', '2022-09-15 14:27:25', '2023-09-15 14:27:25'),
('a65835b4005ba799dd49f08ba860d0b5c26acb38f5e1e52cbb3fcbe5a0f925de5cd5a3bc99b3bc75', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:05:09', '2022-09-17 10:05:09', '2023-09-17 10:05:09'),
('a735a5eea05bddec378bef36f8854df291f1e8df75c3ad1e4c61ebd9fe4ada1d36287d7048456bd1', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:07:35', '2022-09-17 10:07:35', '2023-09-17 10:07:35'),
('a7d69f388e42c86b5923dd9b8b8bbb21e08583e681170c80a59054f64cfe29a3f31b0a9af82012ae', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:42:12', '2022-09-19 10:42:12', '2023-09-19 10:42:12'),
('a7d71600e8c4f73bfaf45a6fa490479681f4e2c10c6d3cf30188d57e99d6a9f1d7ec316a27a0b31e', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 12:30:40', '2022-09-17 12:30:40', '2023-09-17 12:30:40'),
('a90972ca8f7534baae0349c5d76e6043cd155efdedc5b1c9ef3189029f9fc38b78281c80dd304554', 167, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-24 19:06:34', '2022-08-24 19:06:34', '2023-08-24 19:06:34'),
('a9f712804773e7ff88e0fe9bc13284ffa77fb02600cd01e6f4066f096aec89f8490b3cf287883a38', 100, 1, 'authToken', '[]', 1, '2022-07-17 08:09:11', '2022-07-17 08:09:11', '2023-07-17 11:09:11'),
('a9fbb20be85ed6785d3a982d6ba0c0148b86a53b3eda24c2487c0840460a545bfb49b9ca7b1c389d', 148, 1, 'authToken', '[]', 0, '2022-09-07 17:21:10', '2022-09-07 17:21:10', '2023-09-07 17:21:10'),
('aa11b0581154ece829640d2f29d77b85c8827b5f19c0d7c1c862ead7b665c596e9d8354754888f48', 176, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-31 14:52:27', '2022-08-31 14:52:27', '2023-08-31 14:52:27'),
('aac3c7d26dd02b0700907dcfdbfa5540e2115487ffd8f39b699f31d8f9669d5211736e4b1cb94cbd', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-27 15:17:03', '2022-08-27 15:17:03', '2023-08-27 15:17:03'),
('ab387a101b6a1d67d980d24ae72852a9309eb0e381db82d3c313d5513497c71a92f087ea5f932fc0', 29, 1, 'authToken', '[]', 0, '2022-04-28 17:14:52', '2022-04-28 17:14:52', '2023-04-28 20:14:52'),
('abb34528bec7d6469def90ddddde32f67109d41feb28a15af0b3d3f94c769a35b5961ace369eba9f', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 08:16:23', '2022-09-09 08:16:23', '2023-09-09 08:16:23'),
('abfccb1ccfcdd1903abc7cca264130f1c2201de63957775951c35227d250f5d49782b2fac1567820', 148, 1, 'authToken', '[]', 0, '2022-09-04 16:25:11', '2022-09-04 16:25:11', '2023-09-04 16:25:11'),
('abfe9feb6463b8f8e4603da62e9250ecd7fb75c6015ce5327b723edca725427c9afe51fd2651266c', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-30 05:30:35', '2022-08-30 05:30:35', '2023-08-30 05:30:35'),
('ad6912f11dfbd4c00f4a1d09411e7f5347c39baebd12c2f650d8bc38a56df1401a80bc92959b7350', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:20:25', '2022-09-19 10:20:25', '2023-09-19 10:20:25'),
('ad782e54c813f236c5c6ce278d91cf4402b7013b265df2d37c63a0c795ae171bd424883902bcaf77', 100, 1, 'authToken', '[]', 0, '2022-06-20 15:39:39', '2022-06-20 15:39:39', '2023-06-20 18:39:39'),
('afffd53edce020e02e3be8697519e3b3265ae467a37e732b97ba82a0d1368d928703453f7430e490', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:43:25', '2022-09-14 11:43:25', '2023-09-14 11:43:25'),
('b028c80e3807dd447dd3765ec1640f5e4a51395b77d693dba9350a427f4714f2b019456fc590fac3', 148, 1, 'authToken', '[]', 0, '2022-09-20 05:11:46', '2022-09-20 05:11:46', '2023-09-20 08:11:46'),
('b0fefe4d48f8bec6b26c6bbab7161033e57a3b27204773d4197b87ca8dad731afe051a30ad85dab8', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-13 11:07:03', '2022-09-13 11:07:03', '2023-09-13 11:07:03'),
('b20d5bf4cc91ef36ccd7d2a04bfc13b6e4f66e9f4a791d6af79249ee31db7b9665f5d3902d45d27f', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-06 08:00:39', '2022-09-06 08:00:39', '2023-09-06 08:00:39'),
('b27d706e03c9c71f5fc09a619dd64ec7f255082fd74439dc99dcac23cee42914dee1dae1f09175d1', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:57:09', '2022-09-14 11:57:09', '2023-09-14 11:57:09'),
('b58baa1b8b193f002c479c42101010a35552eea9ceb51d932cfd89e66e6200ad6b5b627ad4f47aba', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:39:31', '2022-09-19 10:39:31', '2023-09-19 10:39:31'),
('b6dbfa32d88df8256861e4910009f2ab4d3c8b5d0375f42fb018eac9d28b271781d5a761c8d52517', 148, 1, 'authToken', '[]', 0, '2022-08-23 16:45:27', '2022-08-23 16:45:27', '2023-08-23 16:45:27'),
('b75d53466fdfe59e42b667f70c05e3436821a5469e42fc62b151f3a909905bbe3197f7e161126920', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:09:54', '2022-07-09 21:09:54', '2023-07-10 00:09:54'),
('b765ee68a8ada6c8eefd54ec7ca7101519f0923c22f52289c287eed4408568c673d3530e939009e5', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:06:15', '2022-09-19 10:06:15', '2023-09-19 10:06:15'),
('b8df3f41670b515dc455a522ff3f519a697d8bb2eba3f8da734b0017e11d5eb844bfb645cca363f3', 148, 1, 'authToken', '[]', 0, '2022-07-29 15:51:01', '2022-07-29 15:51:01', '2023-07-29 18:51:01'),
('b999272824b0b5a3ea6402ac1e3ca4a11543fe92d03d813ca2f91c06f6a6f8d86f9a332815888cdd', 148, 1, 'authToken', '[]', 0, '2022-07-30 16:47:27', '2022-07-30 16:47:27', '2023-07-30 19:47:27'),
('b9caf2b4b7c53a06893abed361bf58c4560b08cbea2d689e6d42387f6e6c59982c88db18902235ce', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:19:00', '2022-09-11 10:19:00', '2023-09-11 10:19:00'),
('ba7b28c75a5c74605e28dea3024caa9bf9301ffa4cc2c8014542d9e57c3f2048ab0d56b88eddbbe1', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 13:14:24', '2022-09-19 13:14:24', '2023-09-19 13:14:24'),
('bad40ea3b2df222a61834d27917987e4d7d936f8edf64f9f5fb5eb92b03cd90d28d0ec1390c1ee9f', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:48:43', '2022-09-17 10:48:43', '2023-09-17 10:48:43'),
('bad486d6e115a5cc4643b1f4e59fb523bffcd2e909c49ab29187cfa4eb40232691c2f73fd5d91885', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 08:26:07', '2022-09-09 08:26:07', '2023-09-09 08:26:07'),
('bb6e96d2afa74af64ef47cd6790b2b3929967371db27dbce4d2362d5bb876749b457337753da91a3', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:51:38', '2022-09-19 09:51:38', '2023-09-19 09:51:38'),
('bd4f1c25b471ea279d47d95b78089f0f627843a0caa96383e678803af7710688464cc47fd2daa95b', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:10:14', '2022-08-03 20:10:14', '2023-08-03 23:10:14'),
('bd6fa2b9871e12805d73ed20246bd85d53f14555356d012c81fcb4ddf384f572471cfc148f07abe2', 100, 1, 'authToken', '[]', 0, '2022-06-21 10:30:44', '2022-06-21 10:30:44', '2023-06-21 13:30:44'),
('bdd969b7345699fd99952b0acd49bb36a388e2890e79adfec72bf5dad558a4331d92fba2dde83844', 178, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-03 20:29:49', '2022-09-03 20:29:49', '2023-09-03 20:29:49'),
('bddadba665aff1047ad7421525c4ff5cd33abd920ea96dd9210144e5d54ef3819187bed26fb1ae27', 160, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 19:54:36', '2022-08-03 19:54:36', '2023-08-03 22:54:36'),
('bddbce6f3133439b352017e43075d1be28c730117f012ee6c9eaacf2bd05bbd9759da7878f696701', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-06 07:58:58', '2022-09-06 07:58:58', '2023-09-06 07:58:58'),
('be311331d217b8e41e3b02fd06a978223becf99114c498dba038884fd08968c36b64800421428085', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 10:47:08', '2022-09-15 10:47:08', '2023-09-15 10:47:08'),
('be47d3e83aa2e49efaa27136b7c9a117a10516425ad52ac8a992475f820597232cde4a80d8525762', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:52:02', '2022-09-19 10:52:02', '2023-09-19 10:52:02'),
('bfaf6988a16304037a55553da3423796955f4ce25d6216a1a641d8364e4d32978c915a86f2f0e5f2', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 21:58:28', '2022-09-12 21:58:28', '2023-09-12 21:58:28'),
('c017d01865b2cde03e4b550a8b4f2492607fd8daf21028aac34b8de4a1fd3460fd38051f6cbeea2d', 148, 1, 'authToken', '[]', 0, '2022-08-22 12:30:10', '2022-08-22 12:30:10', '2023-08-22 12:30:10'),
('c01e9914e3d646b7b57994284490e6c2309d370015bff0341c83a38ca0ba684ac12c9dc2800fc66a', 148, 1, 'authToken', '[]', 1, '2022-09-06 19:21:09', '2022-09-06 19:21:09', '2023-09-06 19:21:09'),
('c05a19d14ffebb6374665dcc230f7ad8589adb15d9ee7275d4a3b5d6194ba321002522d8dfee8041', 177, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-06 19:27:18', '2022-09-06 19:27:18', '2023-09-06 19:27:18'),
('c09e14a87d181f6186a910aa61251dcccc56da2ac4b3040b68563544fdeaa9321aeff2d3784c1be6', 100, 1, 'authToken', '[]', 0, '2022-07-10 05:11:59', '2022-07-10 05:11:59', '2023-07-10 08:11:59'),
('c14a97a013ffe5d79a94bf020a8d6108a4d5fa1e455b0312e03749c51cad84b49bc1e094929bc421', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-24 18:00:00', '2022-08-24 18:00:00', '2023-08-24 18:00:00'),
('c1bcd76438b45f8064ebaab8c008a98ab91da88af54985f31f126d2cce30c78fdbf8bf6de5aef056', 100, 1, 'authToken', '[]', 0, '2022-07-09 21:12:51', '2022-07-09 21:12:51', '2023-07-10 00:12:51'),
('c35d8bc988914f5bd8035cfa5be8e5e67a406e4dbb5dc2733249c5e188962ab1bc6dc0f42bc8642e', 148, 1, 'authToken', '[]', 1, '2022-09-06 08:52:17', '2022-09-06 08:52:17', '2023-09-06 08:52:17'),
('c38bf5946a49990fb68ef98704d674003aab89549cc28234d849518c3672d20e0d071d607e90d537', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-20 04:15:25', '2022-09-20 04:15:25', '2023-09-20 07:15:25'),
('c416e2f5a7853dc97123f920a61d4d6f31096f6c9a5db9aa297cd451ac81bebed6d67fc9e1bb0df0', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:40:24', '2022-09-14 12:40:24', '2023-09-14 12:40:24'),
('c49ab63f8078eda1612c06728c1dfa7afda1eac58db57578a08bd0c0098f336d1da6fc8156f18c42', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:06:27', '2022-09-11 10:06:27', '2023-09-11 10:06:27'),
('c50ddc58961cd4819d836185874f2356dcf24f5b69eb7566f8d016f5583fec45f0af845b658ff5ca', 148, 1, 'authToken', '[]', 0, '2022-08-24 10:59:13', '2022-08-24 10:59:13', '2023-08-24 10:59:13'),
('c516d5d27e48bc85f2be78d2bf06b426b5963fee726a42326538a7ada0dd3c4fddff767461647882', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:50:28', '2022-09-14 14:50:28', '2023-09-14 14:50:28'),
('c5595f6a5c76194b4b4ef888b53c33ed67f4f8175b58b8bb293e0281a99000a1c950a584bf222dde', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:51:28', '2022-09-14 11:51:28', '2023-09-14 11:51:28'),
('c596ffd74792bc0025fae8a0b4fcc21b16683ec3d1258e9c121400515672843be92491c85b4fbbb2', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 19:55:57', '2022-09-09 19:55:57', '2023-09-09 19:55:57'),
('c5f18a9cbc6fcc9cd6212311263a6ed0663af14d3b6435dce036be5147acac1e2c5d0bf99c6d4ff9', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:59:06', '2022-09-14 14:59:06', '2023-09-14 14:59:06'),
('c6f9f3c60e113bf318c5f916d8a30b4809a70c4a75d4fa6ba2410127c5e03e2badb05d7bb37a5e10', 100, 1, 'authToken', '[]', 0, '2022-07-19 22:59:25', '2022-07-19 22:59:25', '2023-07-19 15:59:25'),
('c76a264abc50c0a9f6d10809aa710be2dae8d1227977beaae65bb0bf51401f13bd72a06c51a02da4', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:15:46', '2022-09-06 10:15:46', '2023-09-06 10:15:46'),
('c875bec3d0319bcc92a1182fa869aa71d130cfb708717bbc9d9380a7c761adf6a40a627ec86d73b7', 100, 1, 'authToken', '[]', 1, '2022-07-09 21:20:03', '2022-07-09 21:20:03', '2023-07-10 00:20:03'),
('c93723457b7835467f0ddf52b8cef973aec2a34de8eb732f348025ded4ef56b769ae2e3802497e7c', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:35:06', '2022-09-14 11:35:06', '2023-09-14 11:35:06'),
('c94aaabe789507e1391dd7cf11b88a2b1e4b4342fcbabbecda71c4e66a806fccfac2d9f42bcb3619', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 08:23:55', '2022-09-09 08:23:55', '2023-09-09 08:23:55'),
('c966c58cdeb8832772d54d9cd138c2fc90f6e08d30e267a2aee7cbb990a0ab80fdf4cde61b2dcbb3', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-27 15:03:06', '2022-08-27 15:03:06', '2023-08-27 15:03:06'),
('c9aca5e027ccf13ce25aa2859391152acb0cd39574ac92b2a4de03759b9569c76bcb95e5b7318bfd', 65, 1, 'authToken', '[]', 0, '2022-06-17 14:32:02', '2022-06-17 14:32:02', '2023-06-17 17:32:02'),
('c9f42e8dab7cc9bced5fe07ecb4028d384a23e08efc949833e8df527187f0bb0190d83dd536905c8', 168, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-27 14:40:29', '2022-08-27 14:40:29', '2023-08-27 14:40:29'),
('ca7ac8ebffe8c8eeba6580e0924c7d3ce491f592683a75cdfd12feddca62ce354b9f5e38f3c8ba83', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:17:59', '2022-09-06 10:17:59', '2023-09-06 10:17:59'),
('ca7f76fd1df192c6adbcd61a4979b499cc862d034037a6080411954a2f57b49cc653b28b13605707', 148, 1, 'authToken', '[]', 0, '2022-07-29 15:52:42', '2022-07-29 15:52:42', '2023-07-29 18:52:42'),
('cb7756f39b4ab5e416cec2fa8e268fcd38f04a67add5814be6a13edafa2054cd9a30bb87bf23b1e9', 160, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 19:54:59', '2022-08-03 19:54:59', '2023-08-03 22:54:59'),
('cbebd96f98e48050b2149f8aa8322b61800496097ad20e3d27064a4ad080ec524cd4efdaae798788', 38, 1, 'authToken', '[]', 1, '2022-04-28 20:21:17', '2022-04-28 20:21:17', '2023-04-28 23:21:17'),
('cbfab5f07b924cff6cb7a0b1d679c4ed5c9146098c34ff406e9386151eef18b552b5da665fc6638e', 148, 1, 'authToken', '[]', 0, '2022-09-04 08:18:43', '2022-09-04 08:18:43', '2023-09-04 08:18:43'),
('cc819203e4e85756a4157b490c08b75f002b4d8e26fd8f0f702a8ab6f54479fb370e14a0715da0f8', 148, 1, 'authToken', '[]', 0, '2022-08-31 14:23:33', '2022-08-31 14:23:33', '2023-08-31 14:23:33'),
('cea976a3fc78c525abe58c7b744c462c0eb511569140ebc14b4c400420b95f5be242d41e49e6552c', 1, 1, 'authToken', '[]', 0, '2022-05-30 12:05:40', '2022-05-30 12:05:40', '2023-05-30 15:05:40'),
('cef597cf1dfac79b99fa535bf997302ece29c321765c4bdea85b98c1d94ded8429b22ee1c9e7600e', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:36:50', '2022-09-17 10:36:50', '2023-09-17 10:36:50'),
('cf2a9a2389e5afde38b6f823da3a53c1bedd790ba9171fe10761b789640b861c018104c61d58ecde', 1, 1, 'authToken', '[]', 0, '2022-06-17 14:32:11', '2022-06-17 14:32:11', '2023-06-17 17:32:11'),
('cf7078b446c6a22d05ce8f90b53facd399466fd334251eecd6f1312a23fb371699724c4005ee5f99', 148, 1, 'authToken', '[]', 0, '2022-07-24 17:10:01', '2022-07-24 17:10:01', '2023-07-24 20:10:01'),
('d12159ca0e275394949d74ae03d3240eae9d52137ce6a88d0b308f0f279b94cd03bf72bfb102d380', 1, 1, 'authToken', '[]', 0, '2022-05-31 17:59:17', '2022-05-31 17:59:17', '2023-05-31 20:59:17'),
('d25e2d765d8266c3fd8282dfe21b9820969806e5adeae37c9c7470867d17a739f53b499b8f7a8ae5', 148, 1, 'authToken', '[]', 0, '2022-09-05 11:42:34', '2022-09-05 11:42:34', '2023-09-05 11:42:34'),
('d3d49d5f34819814df19e348ad14648c2b42191352d080a448d13dd951d472aa50184f016f75b4f7', 148, 1, 'authToken', '[]', 0, '2022-08-24 05:24:41', '2022-08-24 05:24:41', '2023-08-24 05:24:41'),
('d419e1e0e6425bb352c72d13bf3c4d614eb42be8a7c262129b54335c96044b4426d18c59af85812e', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 15:06:02', '2022-09-14 15:06:02', '2023-09-14 15:06:02'),
('d4a308dc294012cf374f0500d5e81362e26f27258f23a92ce091c66606f30276424ea40ef0a06eaf', 100, 1, 'authToken', '[]', 0, '2022-07-15 14:58:18', '2022-07-15 14:58:18', '2023-07-15 17:58:18'),
('d4e89840ecb1a132e83f1a77c7272bdf9b81e3df2920558661a9e9f7c9cbfa03134c02e35ed16ba8', 65, 1, 'authToken', '[]', 0, '2022-06-16 15:13:47', '2022-06-16 15:13:47', '2023-06-16 18:13:47'),
('d4fe19df2e81035c6604a4b0e6105e299a872f64639722574c12fb4d1b10f0008ce9db4f122c6590', 100, 1, 'authToken', '[]', 1, '2022-07-17 04:14:08', '2022-07-17 04:14:08', '2023-07-17 07:14:08'),
('d56997858e50b7d9d5b94f3267853f98b256a0ca148b9e5a9b83be8a79577d47c1e3bf8e8cf3e6ae', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:32:24', '2022-08-03 20:32:24', '2023-08-03 23:32:24'),
('d6d0c0aa515e5c1ab2628eb547597a8da9d797149709aeb27ce0c51bc77d4eddfe7d49f9f329cd6b', 100, 1, 'authToken', '[]', 1, '2022-07-17 10:40:03', '2022-07-17 10:40:03', '2023-07-17 13:40:03'),
('d7d226d03218fd3469ae29885ebaaad3bb799b406df407888b56fcd3fffdf5a6bce80e4c14c16e48', 185, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 08:27:31', '2022-09-12 08:27:31', '2023-09-12 08:27:31'),
('d7dca726ca2f44908489e3c100dbeb6c85f829415184e1b6cf4ee2fd1db60aaad6d2f89f97d2d305', 1, 1, 'authToken', '[]', 1, '2022-05-02 01:33:21', '2022-05-02 01:33:21', '2023-05-02 04:33:21'),
('d855ef14432ed621c6b01ff6027a28bf131255f93a74312b8daf1fc77f8fc1c90fb3d1b692dabb1c', 1, 1, 'authToken', '[]', 0, '2022-05-13 11:12:58', '2022-05-13 11:12:58', '2023-05-13 14:12:58'),
('d85dbc57e43df86744303c769fba3e1ec96c84f329e03d067ccf086d12d6f991f327c5a1068e1238', 65, 1, 'authToken', '[]', 0, '2022-06-19 13:39:43', '2022-06-19 13:39:43', '2023-06-19 16:39:43'),
('d8ea29b98f14d33238d5ee6832ad90cd11d899fdbb590c000bfd25007afaac29091cea1d73415f12', 187, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 11:40:02', '2022-09-14 11:40:02', '2023-09-14 11:40:02'),
('d917d0de6b59122d3695c8e00e2b14af72e16dc3a3f2ec896e9e4147f604bf697ec2a6fcae5682d8', 148, 1, 'authToken', '[]', 0, '2022-09-06 09:42:36', '2022-09-06 09:42:36', '2023-09-06 09:42:36'),
('d98a87949ffff614422ab7a3a5204c5f8fe0db6815d437f81992d3781deb71c3983988b3acde8ea1', 181, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 08:16:51', '2022-09-08 08:16:51', '2023-09-08 08:16:51'),
('d9b295de0e34687b4e096d9850e8377f3652e8c61d6851c285bd1f2c9d6b84f2064370a53be7ee65', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 14:57:16', '2022-09-14 14:57:16', '2023-09-14 14:57:16'),
('da616c2c876aa4383f5554d75132b0a6347a87f62a701f2ea11a10b6b9fa660a0ee1a13d6b1554fe', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:39:15', '2022-09-17 10:39:15', '2023-09-17 10:39:15'),
('dcd89a8c9212eb957ef3cdb5e23a0bcddcbbb54a4d546b48c0e4e59e65ae1f22a3a3a5b4badd7fd1', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 13:50:08', '2022-09-15 13:50:08', '2023-09-15 13:50:08'),
('de3a7f496c40e402156ad1edeba00dd0490d18a9a9de079d4d852d96298d40202d1ff0056b54d889', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 09:49:57', '2022-09-12 09:49:57', '2023-09-12 09:49:57'),
('dea41f322f2125aa1b662fe4c8e5e397cd845e4f4ab77d72bf7713719e8b1566dc5da7406bf17300', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 20:00:18', '2022-09-12 20:00:18', '2023-09-12 20:00:18'),
('df6a5c98b5e4376510a634e788ef6e5e9978578633d223c8af073b5d5286c74d8bea228771b0474b', 148, 1, 'authToken', '[]', 0, '2022-07-30 17:00:51', '2022-07-30 17:00:51', '2023-07-30 20:00:51'),
('df76c8df069acc4462281f2866399f3875d9414ec99c11af05893ccef4c79f00e7e404116cb3f0c8', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 11:19:55', '2022-09-17 11:19:55', '2023-09-17 11:19:55'),
('dfd49b42624190a2ad54f81ca2677293474e6458cb1c67637cbc084d4f3f879d0009cff52af81fba', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 13:09:28', '2022-09-17 13:09:28', '2023-09-17 13:09:28'),
('dfdb0fcffdb5b36a8828851c4b8d6404ad351251343a000aa7bfa5478dbf363385c196cc9c3b609f', 100, 1, 'authToken', '[]', 0, '2022-07-10 05:13:24', '2022-07-10 05:13:24', '2023-07-10 08:13:24'),
('e034830beeddbb93efb8a60997fc7a6b0283a9d53fa6a53bfe5d272db6f09aa49d4e6f440bf07908', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:07:25', '2022-09-06 10:07:25', '2023-09-06 10:07:25'),
('e1667df70fdd4bf4973cb47ff90a6dc44a73ded71e8271f85e541fea7f0420bfd5c0a8f93a5d1a3f', 100, 1, 'authToken', '[]', 0, '2022-07-10 05:11:52', '2022-07-10 05:11:52', '2023-07-10 08:11:52'),
('e24b0cc11eca697a7e6152be0392c859b1ed09038f90b7d74cae3bbfde86c0afadeca68134b868ff', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 09:56:32', '2022-09-19 09:56:32', '2023-09-19 09:56:32'),
('e28fcd90fe4a89153e36813b0b522b337d17149a1cecfbc102074d7b4931df1d5d486bc70f38e4f3', 148, 1, 'authToken', '[]', 0, '2022-08-08 13:01:00', '2022-08-08 13:01:00', '2023-08-08 16:01:00'),
('e3a79dd0e63c7275ec0581a7d9b8289f9222a541d087f48fcf5deac6ce30d2bff53e1e17893bb9eb', 148, 1, 'authToken', '[]', 0, '2022-09-06 09:59:41', '2022-09-06 09:59:41', '2023-09-06 09:59:41'),
('e4d3eff60fc44f154a8ff9d2bda4fa94e7526b935e2184f91a9abe8f542db81ab697e02dfb614882', 174, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-30 07:01:51', '2022-08-30 07:01:51', '2023-08-30 07:01:51'),
('e52849cfeece3809cff2243c58e8399b862772cdcaf2012d34ef62546d00a9d1c6a6f7ef2d10be58', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 10:30:22', '2022-09-15 10:30:22', '2023-09-15 10:30:22'),
('e53fe840a139df5a418233a8ea470cbb877179ce8f8c2bf02e7fa43197053aabfc5261e7d0203171', 175, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-18 11:29:19', '2022-09-18 11:29:19', '2023-09-18 11:29:19'),
('e567351d014c5f8adcc80d1807db03ec403a47aa17ae85513e564f8d2b408cbb0d09a2fd81ca636b', 38, 1, 'authToken', '[]', 0, '2022-04-28 20:13:43', '2022-04-28 20:13:43', '2023-04-28 23:13:43'),
('e7fbe1c6df33c0eb43a4c82c5da7fac2e2ed07a275f63cc085c7e32c36ff4d93657a7effa1982ce2', 177, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 15:34:10', '2022-09-19 15:34:10', '2023-09-19 15:34:10'),
('e85871786bd549959664bf6bf6471016e85c3fdd7f176a357d3ddb8cb9466f331c38894c38d0827b', 148, 1, 'authToken', '[]', 1, '2022-08-22 10:20:51', '2022-08-22 10:20:51', '2023-08-22 10:20:51'),
('e85eb9586c3123474efccc835c0ad0a1924519a1702267abf67361fc7538dcc42e9e9165747467b2', 1, 1, 'authToken', '[]', 0, '2022-05-13 11:13:20', '2022-05-13 11:13:20', '2023-05-13 14:13:20'),
('e8c52d48e54c93df1e4cd30203723e7ee7db133b7c31ae92862dbf7d7580f2b6fdc1078604468456', 148, 1, 'authToken', '[]', 0, '2022-09-06 10:15:12', '2022-09-06 10:15:12', '2023-09-06 10:15:12'),
('e9385066481c9a72f7cc24fd91b8907c4eed05931ee7c5e7d523946dacc7a0ca834ea257894065be', 148, 1, 'authToken', '[]', 0, '2022-08-17 08:08:10', '2022-08-17 08:08:10', '2023-08-17 11:08:10'),
('e95dd9c5eee4558c19a3b4004a545788abf79a5debbedaa17fe12e8cfb6a3720fe4dd059b73312d1', 148, 1, 'authToken', '[]', 0, '2022-09-05 09:21:19', '2022-09-05 09:21:19', '2023-09-05 09:21:19'),
('ea1e9ad514e5c2a0b779b69440cbbf1fbb721d0ef28a2fbd15bfe092f267c792cca4923e8536be58', 183, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 18:07:34', '2022-09-11 18:07:34', '2023-09-11 18:07:34'),
('eb8ebcc20bfc01eb34e87bddcf6f94bcdbeecb887a22cb85dd8ac134e1d025ae469c86db423fe970', 152, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 20:11:36', '2022-08-03 20:11:36', '2023-08-03 23:11:36'),
('ec139e8a20f19122a2fa3b87ec0c62c339e66d0a89a94e047b0cea8e8a77f919b6772eb667aa7372', 1, 1, 'authToken', '[]', 0, '2022-05-13 14:06:44', '2022-05-13 14:06:44', '2023-05-13 17:06:44'),
('ec42cdc868c1f9a3899b6b923bc6765e2a68cbae95a0e981139ae9706a98e72ae28ffb01e4fa852e', 148, 1, 'authToken', '[]', 0, '2022-07-24 13:48:54', '2022-07-24 13:48:54', '2023-07-24 16:48:54'),
('ed8acc1e3afbd1ed9f4ddf91fc9a78ab55447ddc5011b8df2bf85e3f3fd8ffcc63d38446418f5cdc', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-10 11:15:14', '2022-09-10 11:15:14', '2023-09-10 11:15:14'),
('edbf73c2084bbd5482ebe4828dfc9941d6fd59946b8cd6cbc52c337c9fecb785fe0450c212a6f98f', 148, 1, 'authToken', '[]', 0, '2022-09-05 08:26:34', '2022-09-05 08:26:34', '2023-09-05 08:26:34'),
('ede60466b44b970d3595153e00dc4f81f6ec5164d1ef1d53045d9767e7a3270b5725fec042f4b13a', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:42:53', '2022-09-14 12:42:53', '2023-09-14 12:42:53'),
('ee6dbe60bc9617b097af41da3cae469f1f03d9177c56ededdb8b24eebe548eccd982a49ef0668b57', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 15:28:42', '2022-09-15 15:28:42', '2023-09-15 15:28:42'),
('eecc26703c24fc9b5e8fcf5d6445600e065b26bf2bf45db636217c2c903da63d04de734fa7023587', 189, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:31:32', '2022-09-14 12:31:32', '2023-09-14 12:31:32'),
('ef27e045e1bc8aaf76ef555612e16610cbdd860602e1fac9824238ceeab1a42957e183c62c82e97f', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-12 21:01:33', '2022-09-12 21:01:33', '2023-09-12 21:01:33'),
('f1a2d717d4246e597b55acb63b479203abc13baeb2ce18a94985d3b4b309f59d9f82ea67368b3817', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:57:33', '2022-09-19 10:57:33', '2023-09-19 10:57:33'),
('f1d0efc7ce98a89778a3b8f3712eb3a59ee85f38d8e10b14587404600a6f416bf7467922ed965e14', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 15:00:02', '2022-09-14 15:00:02', '2023-09-14 15:00:02'),
('f21b3c2a7440dcec09ea6d2ff9ae5da7d259e43998d89bc99dafd10ae138ddb133d56339e143055d', 180, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-09 19:47:21', '2022-09-09 19:47:21', '2023-09-09 19:47:21'),
('f26efedd132925d855740ee4386cb941dd9d35578159f864915532e7a783a0eeaf563b5088d854e4', 38, 1, 'authToken', '[]', 0, '2022-04-28 20:16:01', '2022-04-28 20:16:01', '2023-04-28 23:16:01'),
('f2b29b9628c51a7093af1bb842eb37af4aa08385d5f74058f532805a4854a598d1a2971e66ceb2a9', 162, 1, 'Laravel Password Grant Client', '[]', 0, '2022-08-03 21:51:03', '2022-08-03 21:51:03', '2023-08-04 00:51:03'),
('f387d7b8339ec762b487fc826b185bc8ad42f70e86bf2019950da2f954fc2527ebd6c73b1620677c', 183, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-15 11:45:27', '2022-09-15 11:45:27', '2023-09-15 11:45:27'),
('f40fe0360f89afd99d25cf596e9059c179cad55e3992ffe0e9bdb2a015c99471ce375d49ce3fcc44', 65, 1, 'authToken', '[]', 0, '2022-06-16 14:56:19', '2022-06-16 14:56:19', '2023-06-16 17:56:19'),
('f542e4697f8560cc2eaf5049c912520f13dfb49d7d292628a062f1e93eda0574bdf065e3b8649863', 148, 1, 'authToken', '[]', 0, '2022-09-20 03:42:15', '2022-09-20 03:42:15', '2023-09-20 06:42:15'),
('f735aa2c19bee9d888d811ee54757e90401197620de757783c191c2d25dafce04d3b431bffe8bd5e', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-19 10:23:00', '2022-09-19 10:23:00', '2023-09-19 10:23:00'),
('f80a23086ebe31f3692386d548b9afd82c1d3acf734ca5f9f07adb6021480ee3808d5477dff3a352', 181, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-08 09:35:05', '2022-09-08 09:35:05', '2023-09-08 09:35:05'),
('f8965eb4498e35ea91c2ecc5bcc28079caf7c4f5316fe97a829847cf6694593004ad60b081288b4d', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 10:45:46', '2022-09-17 10:45:46', '2023-09-17 10:45:46'),
('f8ca96c3bbbad246f87f75993396dc9942243b2ee8d5a97a6c36c08487f555f084401884ee942c56', 1, 1, 'authToken', '[]', 0, '2022-05-02 01:24:31', '2022-05-02 01:24:31', '2023-05-02 04:24:31'),
('f97eaa99fe5c117f01021a0cbd52a5fb37f8b023a77f125624810806f495bcbc4220333f3cb16452', 148, 1, 'authToken', '[]', 0, '2022-08-17 08:06:46', '2022-08-17 08:06:46', '2023-08-17 11:06:46'),
('f98fbd05afae3010435996c2c4912591de9545833adf85503855efcc06931fe190c2448a084e87ea', 148, 1, 'authToken', '[]', 1, '2022-08-22 12:26:44', '2022-08-22 12:26:44', '2023-08-22 12:26:44'),
('fa13fbb7af6d1cf4d1a54812b9fd10a03d888adfa2f79da0a88eaafe0c318c583f961254b1f6aba5', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 23:05:19', '2022-09-11 23:05:19', '2023-09-11 23:05:19'),
('fb331857138fe7faf2f418b7a406098495432e2a201b7de79dba374193b18b574462390621cc2d6d', 19, 1, 'authToken', '[]', 0, '2022-04-28 17:03:29', '2022-04-28 17:03:29', '2023-04-28 20:03:29'),
('fb9162e2acd4acf225cf8a198640d3e8ff06b02b39bb1f3fda19a591cbd2db968416baf88830f6ea', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-14 12:26:49', '2022-09-14 12:26:49', '2023-09-14 12:26:49'),
('fc19246cd18c92e42589cb697557d7fc194004b397271ac1e2a0b3e8bc8d9903af4c58e51c2c9ab9', 182, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-11 10:20:25', '2022-09-11 10:20:25', '2023-09-11 10:20:25'),
('fca17caa3c8c6279a015d43a822ce8ea8598c3285435d051c7a522ea53f2ed218bfc3a1f589691c0', 148, 1, 'authToken', '[]', 1, '2022-09-06 09:01:04', '2022-09-06 09:01:04', '2023-09-06 09:01:04'),
('ff854620acf4f263502814e143693f3ebaa2acacb5aba4c7a01423c59f29ff4867f3ad131e6fdd81', 188, 1, 'Laravel Password Grant Client', '[]', 0, '2022-09-17 09:46:53', '2022-09-17 09:46:53', '2023-09-17 09:46:53');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'sGl9Cxj0NqWsPpxvHMKQkwM0irNcs1d1qwncUV0a', NULL, 'http://localhost', 1, 0, 0, '2022-04-28 16:22:18', '2022-04-28 16:22:18'),
(2, NULL, 'Laravel Password Grant Client', 'flE8YJgKR0UFtMuZulEnbF1W6dAFbTVmzDNSKSVh', 'users', 'http://localhost', 0, 1, 0, '2022-04-28 16:22:18', '2022-04-28 16:22:18');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2022-04-28 16:22:18', '2022-04-28 16:22:18');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `driver_id` int(10) UNSIGNED NOT NULL,
  `client_id` int(10) UNSIGNED NOT NULL,
  `fee` double(8,2) NOT NULL,
  `price` double(8,2) NOT NULL,
  `copon_price` double(8,2) DEFAULT NULL,
  `with_copon` tinyint(1) DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `address_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `description` text DEFAULT NULL,
  `ar_name` varchar(999) DEFAULT NULL,
  `ar_describtion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`, `is_active`, `description`, `ar_name`, `ar_describtion`) VALUES
(109, 'Mwasat hospital', 148, NULL, '2022-08-29 08:47:16', '2022-09-05 10:30:02', 1, 'hospital', NULL, NULL),
(110, 'test', 148, NULL, '2022-09-05 10:31:27', '2022-09-19 11:57:56', 1, 'testtesttesttestvvv', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `relations`
--

CREATE TABLE `relations` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `relations`
--

INSERT INTO `relations` (`id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`, `is_active`) VALUES
(1, 'Uncle', 148, NULL, '2022-08-31 15:00:35', '2022-08-31 15:02:11', 1),
(2, 'father', 148, NULL, '2022-09-05 10:30:15', '2022-09-05 10:30:15', 1);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) UNSIGNED NOT NULL,
  `donor_id` int(10) UNSIGNED NOT NULL,
  `amount` double NOT NULL,
  `status` enum('pending','rejected','accepted') NOT NULL DEFAULT 'pending',
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `donor_id`, `amount`, `status`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES
(1, 61, 1000, 'accepted', 175, NULL, '2022-09-19 18:15:43', '2022-09-19 18:15:59');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `created_by`, `modified_by`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, 'superAdmin', 'api', '2022-04-28 15:00:04', '2022-04-28 15:00:04'),
(2, NULL, NULL, 'printer', 'api', '2022-04-28 15:00:04', '2022-04-28 15:00:04'),
(3, NULL, NULL, 'delivery', 'api', '2022-04-28 15:00:04', '2022-04-28 15:00:04'),
(4, NULL, NULL, 'cash', 'api', '2022-04-28 15:00:04', '2022-04-28 15:00:04');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `secret_info`
--

CREATE TABLE `secret_info` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `provider_id` int(10) UNSIGNED DEFAULT NULL,
  `person_name` varchar(299) DEFAULT NULL,
  `phone_number` varchar(299) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `note` text DEFAULT NULL,
  `relation_id` int(11) UNSIGNED DEFAULT NULL,
  `relation_name` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `secret_info`
--

INSERT INTO `secret_info` (`id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `provider_id`, `person_name`, `phone_number`, `address`, `note`, `relation_id`, `relation_name`) VALUES
(89, 148, NULL, '2022-08-29 08:46:20', '2022-08-29 17:44:18', 109, 'test', '42434243', 'test', 'ewtewtw', NULL, NULL),
(90, 148, NULL, '2022-08-29 17:43:07', '2022-08-29 17:43:07', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(91, NULL, NULL, '2022-08-31 14:59:52', '2022-09-05 09:14:40', 109, 'gf', '97654323', 'test\n\n\ntest', 'Test\n\n\ntest', 1, 'fdgfdd');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`, `created_by`, `updated_by`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'new', NULL, NULL, 0, NULL, NULL),
(2, 'recieved', NULL, NULL, 0, NULL, NULL),
(3, 'Printed', NULL, NULL, 0, NULL, NULL),
(4, 'On the way', NULL, NULL, 0, NULL, NULL),
(5, 'Deliveried', NULL, NULL, 0, NULL, NULL),
(6, 'Completed', NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sub_order`
--

CREATE TABLE `sub_order` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `order_id` int(10) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `success_cases`
--

CREATE TABLE `success_cases` (
  `id` int(11) UNSIGNED NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vedio_url` varchar(299) DEFAULT NULL,
  `case_id` int(11) UNSIGNED NOT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `views_count` bigint(40) NOT NULL DEFAULT 0,
  `ar_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `success_cases`
--

INSERT INTO `success_cases` (`id`, `description`, `created_by`, `updated_by`, `created_at`, `updated_at`, `vedio_url`, `case_id`, `is_active`, `views_count`, `ar_description`) VALUES
(14, 'fdsfdsfm', 148, NULL, '2022-08-29 11:22:37', '2022-09-12 08:42:10', NULL, 95, b'1', 0, NULL),
(15, 'testtesttesttesttest\ntesttesttest\ntest\ntest\ntesttesttesttesttest\ntest test test test test', 148, NULL, '2022-09-05 10:15:43', '2022-09-19 11:59:11', NULL, 95, b'1', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `system`
--

CREATE TABLE `system` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system`
--

INSERT INTO `system` (`id`, `key`, `value`) VALUES
(1, 'SYSTEM_KAFO_BALANCE', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `system_config`
--

CREATE TABLE `system_config` (
  `id` int(10) UNSIGNED NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verfied` tinyint(1) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `firebase_token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `number` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` bit(1) NOT NULL DEFAULT b'1',
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` datetime DEFAULT NULL,
  `language` enum('ar','en','','') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en',
  `created_by` int(11) DEFAULT NULL,
  `full_name` varchar(299) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_name` varchar(2999) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fcm_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fcm_token_mobile` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `email_verfied`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `firebase_token`, `last_login`, `number`, `last_name`, `mobile`, `is_active`, `is_deleted`, `deleted_at`, `language`, `created_by`, `full_name`, `user_name`, `fcm_token`, `fcm_token_mobile`) VALUES
(148, 'admin@example.com', 1, '2022-07-09 22:01:35', '$2y$10$KmPGsZynpjbE89LAJRgfm.TA.a4o2sA6KzXv83AMXahv2wAgEfWTe', NULL, '2022-07-14 22:01:35', '2022-09-20 05:16:06', NULL, '2022-07-21 00:01:35', NULL, NULL, NULL, b'1', 0, NULL, 'en', NULL, 'testrtre', 'test', 'ef5xI-PuU4K53jWQ64UitT:APA91bFir4T3OSUS72DORqysKAoko0SOlpktytoaOjSCGzg3uEcePdO8doS89B5gvtwlSKFd1Rv0Q5tkws5QTyTzLsceh6oJ7pwJD5LJRALOQgMszdOeq-4vlzDwavDizDYsa1_pLps-', NULL),
(174, 'tstpic@hotmail.com', NULL, NULL, '', NULL, '2022-08-30 05:18:36', '2022-09-13 10:33:30', NULL, NULL, NULL, NULL, '6666666663', b'1', 0, NULL, 'en', NULL, '9999999', NULL, NULL, NULL),
(175, NULL, NULL, NULL, '', NULL, '2022-08-30 18:52:20', '2022-09-20 04:15:29', NULL, NULL, NULL, NULL, '666666666', b'1', 0, NULL, 'en', NULL, '9999999', NULL, 'fzE96WrGZy02_UP6563P_5:APA91bHjVGW0E3jPWeUAIXW4jRtwJ6Ueno3Dw2Vj4jQ55DzPoliKPh9Rd9HYlq6Qqxm7buRjMDmVW3LOihaBL_2GyTK_XePUratbJDYLFyEFgd4vTwUcBenyk2ljmEHhSg6_Bsab6Roh', NULL),
(176, NULL, NULL, NULL, '', NULL, '2022-08-31 14:52:24', '2022-08-31 14:55:49', NULL, NULL, NULL, NULL, '666666666', b'1', 0, NULL, 'en', NULL, '9999999', NULL, NULL, NULL),
(177, NULL, NULL, NULL, '', NULL, '2022-09-01 08:38:24', '2022-09-18 11:43:55', NULL, NULL, NULL, NULL, '0926515455', b'1', 0, NULL, 'en', NULL, '9999999', NULL, NULL, NULL),
(178, NULL, NULL, NULL, '', NULL, '2022-09-03 19:34:18', '2022-09-03 19:34:18', NULL, NULL, NULL, NULL, '0930596440', b'1', 0, NULL, 'en', NULL, 'Jfjfj', NULL, NULL, NULL),
(179, NULL, NULL, NULL, '', NULL, '2022-09-05 10:22:47', '2022-09-05 12:17:50', NULL, NULL, NULL, NULL, '988233048', b'1', 0, NULL, 'en', NULL, 'D test', NULL, NULL, NULL),
(180, NULL, NULL, NULL, '', NULL, '2022-09-08 06:09:26', '2022-09-10 12:36:05', NULL, NULL, NULL, NULL, '666666666', b'1', 0, NULL, 'en', NULL, '9999999', NULL, NULL, NULL),
(181, NULL, NULL, NULL, '', NULL, '2022-09-08 08:16:40', '2022-09-08 08:16:40', NULL, NULL, NULL, NULL, '0930596441', b'1', 0, NULL, 'en', NULL, 'Mhd M', NULL, NULL, NULL),
(182, NULL, NULL, NULL, '', NULL, '2022-09-09 08:23:44', '2022-09-14 10:41:19', NULL, NULL, NULL, NULL, NULL, b'1', 0, NULL, 'en', NULL, '9999999', NULL, NULL, NULL),
(183, NULL, NULL, NULL, '', NULL, '2022-09-10 06:10:30', '2022-09-10 06:10:30', NULL, NULL, NULL, NULL, '0938435359', b'1', 0, NULL, 'en', NULL, 'mm mmm', NULL, NULL, NULL),
(184, NULL, NULL, NULL, '', NULL, '2022-09-10 11:41:53', '2022-09-10 11:41:53', NULL, NULL, NULL, NULL, '0988233048', b'1', 0, NULL, 'en', NULL, 'Deema', NULL, NULL, NULL),
(185, NULL, NULL, NULL, '', NULL, '2022-09-10 21:11:33', '2022-09-10 21:11:33', NULL, NULL, NULL, NULL, '0934641049', b'1', 0, NULL, 'en', NULL, 'Hasn Arisha', NULL, NULL, NULL),
(186, NULL, NULL, NULL, '', NULL, '2022-09-14 11:19:15', '2022-09-14 11:19:15', NULL, NULL, NULL, NULL, '0938747474', b'1', 0, NULL, 'en', NULL, 'donor', NULL, NULL, NULL),
(187, NULL, NULL, NULL, '', NULL, '2022-09-14 11:23:12', '2022-09-14 12:08:17', NULL, NULL, NULL, NULL, NULL, b'1', 0, NULL, 'en', NULL, 'testEditprofile', NULL, NULL, NULL),
(188, 'cc@gmail.com', NULL, NULL, '', NULL, '2022-09-14 12:17:00', '2022-09-19 10:00:31', NULL, NULL, NULL, NULL, '0988889999', b'1', 0, NULL, 'en', NULL, 'ghassannnn', NULL, NULL, NULL),
(189, 'email@hotmail.com', NULL, NULL, '', NULL, '2022-09-14 12:30:21', '2022-09-14 12:34:03', NULL, NULL, NULL, NULL, '0977777777', b'1', 0, NULL, 'en', NULL, 'testeditprofilefinal', NULL, NULL, NULL),
(190, NULL, NULL, NULL, '', NULL, '2022-09-14 12:38:42', '2022-09-14 12:38:42', NULL, NULL, NULL, NULL, '0966666666', b'1', 0, NULL, 'en', NULL, 'test', NULL, NULL, NULL),
(191, NULL, NULL, NULL, '', NULL, '2022-09-18 19:01:47', '2022-09-18 19:01:47', NULL, NULL, NULL, NULL, '0994581107', b'1', 0, NULL, 'en', NULL, 'Dr hccgg', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_code`
--

CREATE TABLE `user_code` (
  `id` int(10) UNSIGNED NOT NULL,
  `otp` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `user_id` int(10) UNSIGNED NOT NULL,
  `expired_date` date NOT NULL,
  `number_of_times` int(10) UNSIGNED NOT NULL,
  `last_date` date NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `validations`
--

CREATE TABLE `validations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(99) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `type_id` int(11) UNSIGNED DEFAULT NULL,
  `provider_id` int(10) UNSIGNED DEFAULT NULL,
  `case_id` int(10) UNSIGNED NOT NULL,
  `status` enum('valid','not_valid') COLLATE utf8mb4_unicode_ci NOT NULL,
  `ar_name` varchar(999) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ar_describtion` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `validations`
--

INSERT INTO `validations` (`id`, `name`, `description`, `created_by`, `updated_by`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `type_id`, `provider_id`, `case_id`, `status`, `ar_name`, `ar_describtion`) VALUES
(27, 'test', 'test', 148, NULL, 0, '2022-08-29 08:47:57', '2022-08-29 09:00:36', '2022-08-29 09:00:36', 43, NULL, 95, 'valid', NULL, NULL),
(28, 'test', 'test', 148, NULL, 0, '2022-08-29 08:48:02', '2022-08-29 09:00:34', '2022-08-29 09:00:34', 43, NULL, 95, 'valid', NULL, NULL),
(29, 'test', 'test', 148, NULL, 0, '2022-08-29 08:48:09', '2022-08-29 09:00:32', '2022-08-29 09:00:32', 43, NULL, 95, 'valid', NULL, NULL),
(30, 'test', 'test', 148, NULL, 0, '2022-08-29 08:48:21', '2022-08-29 09:00:30', '2022-08-29 09:00:30', 43, NULL, 95, 'valid', NULL, NULL),
(31, 'test', 'test', 148, NULL, 0, '2022-08-29 08:50:22', '2022-08-29 09:00:27', '2022-08-29 09:00:27', 43, NULL, 95, 'valid', NULL, NULL),
(32, 'test', 'eewtw\n\nh\ntesting', 148, NULL, 0, '2022-08-29 09:00:51', '2022-09-19 11:58:28', NULL, 43, 109, 95, 'valid', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `validation_type`
--

CREATE TABLE `validation_type` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(250) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `validation_type`
--

INSERT INTO `validation_type` (`id`, `name`, `created_by`, `updated_by`, `created_at`, `updated_at`, `is_active`) VALUES
(43, 'test', 148, NULL, '2022-08-29 08:46:32', '2022-09-05 10:29:13', 1),
(44, 'y', 148, NULL, '2022-09-05 10:34:05', '2022-09-19 11:57:21', 0);

-- --------------------------------------------------------

--
-- Table structure for table `verification_codes`
--

CREATE TABLE `verification_codes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verifiable` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wallets`
--

CREATE TABLE `wallets` (
  `id` int(11) UNSIGNED NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `last_charge_amount` float DEFAULT NULL,
  `charge_count` bigint(30) DEFAULT NULL,
  `last_charge_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `wallets`
--

INSERT INTO `wallets` (`id`, `created_by`, `updated_by`, `created_at`, `updated_at`, `amount`, `last_charge_amount`, `charge_count`, `last_charge_date`) VALUES
(24, NULL, NULL, '2022-08-30 05:18:36', '2022-09-06 08:00:55', 9799532, 32, 1, '2022-08-30 07:08:11'),
(25, NULL, NULL, '2022-08-30 18:52:20', '2022-09-19 18:15:59', 1001335, 1000, 1, '2022-09-19 18:15:59'),
(26, NULL, NULL, '2022-08-31 14:52:24', '2022-08-31 14:55:19', 19600000, NULL, NULL, NULL),
(27, NULL, NULL, '2022-09-01 08:38:24', '2022-09-18 11:46:06', 9800000, NULL, NULL, NULL),
(28, NULL, NULL, '2022-09-03 19:34:18', '2022-09-03 19:34:18', NULL, NULL, NULL, NULL),
(29, 148, NULL, '2022-09-05 10:22:47', '2022-09-05 12:20:53', 900000, 100000, 3, '2022-09-05 12:20:53'),
(30, NULL, NULL, '2022-09-08 06:09:26', '2022-09-10 13:10:26', 19599500, NULL, NULL, NULL),
(31, NULL, NULL, '2022-09-08 08:16:40', '2022-09-08 08:16:40', NULL, NULL, NULL, NULL),
(32, NULL, NULL, '2022-09-09 08:23:44', '2022-09-09 08:23:44', NULL, NULL, NULL, NULL),
(33, NULL, NULL, '2022-09-10 06:10:30', '2022-09-10 06:10:30', NULL, NULL, NULL, NULL),
(34, NULL, NULL, '2022-09-10 11:41:53', '2022-09-10 11:41:53', NULL, NULL, NULL, NULL),
(35, NULL, NULL, '2022-09-10 21:11:33', '2022-09-10 21:11:33', NULL, NULL, NULL, NULL),
(36, NULL, NULL, '2022-09-14 11:19:15', '2022-09-14 11:19:15', NULL, NULL, NULL, NULL),
(37, NULL, NULL, '2022-09-14 11:23:12', '2022-09-14 11:23:12', NULL, NULL, NULL, NULL),
(38, NULL, NULL, '2022-09-14 12:17:00', '2022-09-14 12:17:00', NULL, NULL, NULL, NULL),
(39, NULL, NULL, '2022-09-14 12:30:21', '2022-09-14 12:30:21', NULL, NULL, NULL, NULL),
(40, NULL, NULL, '2022-09-14 12:38:42', '2022-09-14 12:38:42', NULL, NULL, NULL, NULL),
(41, NULL, NULL, '2022-09-18 19:01:47', '2022-09-18 19:01:47', NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `address_user_id_foreign` (`user_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `employees_user_id_foreign` (`user_id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `case_donors`
--
ALTER TABLE `case_donors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_donors_ibfk_1` (`donor_id`),
  ADD KEY `case_donors_ibfk_2` (`case_id`);

--
-- Indexes for table `case_followers`
--
ALTER TABLE `case_followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`),
  ADD KEY `donor_id` (`donor_id`);

--
-- Indexes for table `case_updates`
--
ALTER TABLE `case_updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `costs`
--
ALTER TABLE `costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_user_id_foreign` (`user_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `gender_id` (`gender_id`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `drivers_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `files_sub_order_id_foreign` (`sub_order_id`);

--
-- Indexes for table `indexes`
--
ALTER TABLE `indexes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `media_uuid_unique` (`uuid`),
  ADD KEY `media_model_type_model_id_index` (`model_type`,`model_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_address_id_foreign` (`address_id`),
  ADD KEY `orders_driver_id_foreign` (`driver_id`),
  ADD KEY `orders_client_id_foreign` (`client_id`),
  ADD KEY `orders_status_id_foreign` (`status_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `providers`
--
ALTER TABLE `providers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `relations`
--
ALTER TABLE `relations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requests_ibfk_1` (`donor_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `secret_info`
--
ALTER TABLE `secret_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_order`
--
ALTER TABLE `sub_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_order_order_id_foreign` (`order_id`);

--
-- Indexes for table `success_cases`
--
ALTER TABLE `success_cases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `system`
--
ALTER TABLE `system`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `system_config`
--
ALTER TABLE `system_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_email_verfied_unique` (`email_verfied`);

--
-- Indexes for table `user_code`
--
ALTER TABLE `user_code`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_code_user_id_foreign` (`user_id`);

--
-- Indexes for table `validations`
--
ALTER TABLE `validations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `case_id` (`case_id`),
  ADD KEY `type_id` (`type_id`),
  ADD KEY `provider_id` (`provider_id`);

--
-- Indexes for table `validation_type`
--
ALTER TABLE `validation_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification_codes`
--
ALTER TABLE `verification_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wallets`
--
ALTER TABLE `wallets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- AUTO_INCREMENT for table `case_donors`
--
ALTER TABLE `case_donors`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `case_followers`
--
ALTER TABLE `case_followers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `case_updates`
--
ALTER TABLE `case_updates`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `costs`
--
ALTER TABLE `costs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donors`
--
ALTER TABLE `donors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `indexes`
--
ALTER TABLE `indexes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `providers`
--
ALTER TABLE `providers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `relations`
--
ALTER TABLE `relations`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `secret_info`
--
ALTER TABLE `secret_info`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `sub_order`
--
ALTER TABLE `sub_order`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `success_cases`
--
ALTER TABLE `success_cases`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `system`
--
ALTER TABLE `system`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `system_config`
--
ALTER TABLE `system_config`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT for table `user_code`
--
ALTER TABLE `user_code`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `validations`
--
ALTER TABLE `validations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `validation_type`
--
ALTER TABLE `validation_type`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `verification_codes`
--
ALTER TABLE `verification_codes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wallets`
--
ALTER TABLE `wallets`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `employees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `case_donors`
--
ALTER TABLE `case_donors`
  ADD CONSTRAINT `case_donors_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `case_donors_ibfk_2` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `case_followers`
--
ALTER TABLE `case_followers`
  ADD CONSTRAINT `case_followers_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `case_followers_ibfk_2` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `case_updates`
--
ALTER TABLE `case_updates`
  ADD CONSTRAINT `case_updates_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `costs`
--
ALTER TABLE `costs`
  ADD CONSTRAINT `costs_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`);

--
-- Constraints for table `donors`
--
ALTER TABLE `donors`
  ADD CONSTRAINT `donors_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donors_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donors_ibfk_3` FOREIGN KEY (`gender_id`) REFERENCES `indexes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `donors_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `drivers`
--
ALTER TABLE `drivers`
  ADD CONSTRAINT `drivers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `files_sub_order_id_foreign` FOREIGN KEY (`sub_order_id`) REFERENCES `sub_order` (`id`);

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `donors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_driver_id_foreign` FOREIGN KEY (`driver_id`) REFERENCES `drivers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `requests`
--
ALTER TABLE `requests`
  ADD CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `secret_info`
--
ALTER TABLE `secret_info`
  ADD CONSTRAINT `secret_info_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sub_order`
--
ALTER TABLE `sub_order`
  ADD CONSTRAINT `sub_order_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `success_cases`
--
ALTER TABLE `success_cases`
  ADD CONSTRAINT `success_cases_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_code`
--
ALTER TABLE `user_code`
  ADD CONSTRAINT `user_code_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `validations`
--
ALTER TABLE `validations`
  ADD CONSTRAINT `validations_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `validations_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `validation_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `validations_ibfk_3` FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
