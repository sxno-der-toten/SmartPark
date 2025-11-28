-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 28 nov. 2025 à 16:52
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `smartpark`
--

-- --------------------------------------------------------

--
-- Structure de la table `capteur`
--

CREATE TABLE `capteur` (
  `Id_Capteur` int(11) NOT NULL,
  `Etat_capteur` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `modifier_les_statuts`
--

CREATE TABLE `modifier_les_statuts` (
  `Id_Utilisateur` int(11) NOT NULL,
  `Id_Place_Parking` int(11) NOT NULL,
  `Id_Statut` int(11) NOT NULL,
  `Date_modification` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `parking`
--

CREATE TABLE `parking` (
  `Id_Parking` int(11) NOT NULL,
  `N_de_Parking` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `place_parking`
--

CREATE TABLE `place_parking` (
  `Id_Place_Parking` int(11) NOT NULL,
  `Adresse` varchar(255) DEFAULT NULL,
  `Id_Capteur` int(11) NOT NULL,
  `Id_Zone` int(11) NOT NULL,
  `Id_Statut` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reparer`
--

CREATE TABLE `reparer` (
  `Id_Utilisateur` int(11) NOT NULL,
  `Id_Capteur` int(11) NOT NULL,
  `Date_réparation` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rôle`
--

CREATE TABLE `rôle` (
  `Id_Rôle` int(11) NOT NULL,
  `Libéllé` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rôle`
--

INSERT INTO `rôle` (`Id_Rôle`, `Libéllé`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Structure de la table `statut`
--

CREATE TABLE `statut` (
  `Id_Statut` int(11) NOT NULL,
  `Libéllé` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `Id_Utilisateur` int(11) NOT NULL,
  `Email` varchar(320) DEFAULT NULL,
  `Nom` varchar(70) DEFAULT NULL,
  `Prénom` varchar(20) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `Id_Rôle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

CREATE TABLE `vehicule` (
  `Id_Vehicule` int(11) NOT NULL,
  `Immatriculation_` varchar(15) DEFAULT NULL,
  `Id_Parking` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `voir_les_places_`
--

CREATE TABLE `voir_les_places_` (
  `Id_Rôle` int(11) NOT NULL,
  `Id_Parking` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `zone`
--

CREATE TABLE `zone` (
  `Id_Zone` int(11) NOT NULL,
  `Nom_zone` varchar(90) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `capteur`
--
ALTER TABLE `capteur`
  ADD PRIMARY KEY (`Id_Capteur`);

--
-- Index pour la table `modifier_les_statuts`
--
ALTER TABLE `modifier_les_statuts`
  ADD PRIMARY KEY (`Id_Utilisateur`,`Id_Place_Parking`,`Id_Statut`),
  ADD KEY `Id_Place_Parking` (`Id_Place_Parking`),
  ADD KEY `Id_Statut` (`Id_Statut`);

--
-- Index pour la table `parking`
--
ALTER TABLE `parking`
  ADD PRIMARY KEY (`Id_Parking`);

--
-- Index pour la table `place_parking`
--
ALTER TABLE `place_parking`
  ADD PRIMARY KEY (`Id_Place_Parking`),
  ADD KEY `Id_Capteur` (`Id_Capteur`),
  ADD KEY `Id_Zone` (`Id_Zone`),
  ADD KEY `Id_Statut` (`Id_Statut`);

--
-- Index pour la table `reparer`
--
ALTER TABLE `reparer`
  ADD PRIMARY KEY (`Id_Utilisateur`,`Id_Capteur`),
  ADD KEY `Id_Capteur` (`Id_Capteur`);

--
-- Index pour la table `rôle`
--
ALTER TABLE `rôle`
  ADD PRIMARY KEY (`Id_Rôle`);

--
-- Index pour la table `statut`
--
ALTER TABLE `statut`
  ADD PRIMARY KEY (`Id_Statut`);

--
-- Index pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`Id_Utilisateur`),
  ADD KEY `Id_Rôle` (`Id_Rôle`);

--
-- Index pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`Id_Vehicule`),
  ADD KEY `Id_Parking` (`Id_Parking`);

--
-- Index pour la table `voir_les_places_`
--
ALTER TABLE `voir_les_places_`
  ADD PRIMARY KEY (`Id_Rôle`,`Id_Parking`),
  ADD KEY `Id_Parking` (`Id_Parking`);

--
-- Index pour la table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`Id_Zone`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `capteur`
--
ALTER TABLE `capteur`
  MODIFY `Id_Capteur` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `parking`
--
ALTER TABLE `parking`
  MODIFY `Id_Parking` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `place_parking`
--
ALTER TABLE `place_parking`
  MODIFY `Id_Place_Parking` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rôle`
--
ALTER TABLE `rôle`
  MODIFY `Id_Rôle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `statut`
--
ALTER TABLE `statut`
  MODIFY `Id_Statut` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `Id_Utilisateur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `vehicule`
--
ALTER TABLE `vehicule`
  MODIFY `Id_Vehicule` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `zone`
--
ALTER TABLE `zone`
  MODIFY `Id_Zone` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `modifier_les_statuts`
--
ALTER TABLE `modifier_les_statuts`
  ADD CONSTRAINT `modifier_les_statuts_ibfk_1` FOREIGN KEY (`Id_Utilisateur`) REFERENCES `utilisateur` (`Id_Utilisateur`),
  ADD CONSTRAINT `modifier_les_statuts_ibfk_2` FOREIGN KEY (`Id_Place_Parking`) REFERENCES `place_parking` (`Id_Place_Parking`),
  ADD CONSTRAINT `modifier_les_statuts_ibfk_3` FOREIGN KEY (`Id_Statut`) REFERENCES `statut` (`Id_Statut`);

--
-- Contraintes pour la table `place_parking`
--
ALTER TABLE `place_parking`
  ADD CONSTRAINT `place_parking_ibfk_1` FOREIGN KEY (`Id_Capteur`) REFERENCES `capteur` (`Id_Capteur`),
  ADD CONSTRAINT `place_parking_ibfk_2` FOREIGN KEY (`Id_Zone`) REFERENCES `zone` (`Id_Zone`),
  ADD CONSTRAINT `place_parking_ibfk_3` FOREIGN KEY (`Id_Statut`) REFERENCES `statut` (`Id_Statut`);

--
-- Contraintes pour la table `reparer`
--
ALTER TABLE `reparer`
  ADD CONSTRAINT `reparer_ibfk_1` FOREIGN KEY (`Id_Utilisateur`) REFERENCES `utilisateur` (`Id_Utilisateur`),
  ADD CONSTRAINT `reparer_ibfk_2` FOREIGN KEY (`Id_Capteur`) REFERENCES `capteur` (`Id_Capteur`);

--
-- Contraintes pour la table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD CONSTRAINT `utilisateur_ibfk_1` FOREIGN KEY (`Id_Rôle`) REFERENCES `rôle` (`Id_Rôle`);

--
-- Contraintes pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD CONSTRAINT `vehicule_ibfk_1` FOREIGN KEY (`Id_Parking`) REFERENCES `parking` (`Id_Parking`);

--
-- Contraintes pour la table `voir_les_places_`
--
ALTER TABLE `voir_les_places_`
  ADD CONSTRAINT `voir_les_places__ibfk_1` FOREIGN KEY (`Id_Rôle`) REFERENCES `rôle` (`Id_Rôle`),
  ADD CONSTRAINT `voir_les_places__ibfk_2` FOREIGN KEY (`Id_Parking`) REFERENCES `parking` (`Id_Parking`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
