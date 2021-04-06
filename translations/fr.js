import React from "react"

export const app = {
	name: "RIVRA",
	welcome: "Bienvenue dans RIVRA",
}

export const login = {
	title: "Connexion",
	email: "Adresse courriel",
	pass: "Mot de passe",
	access: "Accéder",
	emailerror: "Entrez une adresse courriel valide",
	passerror: "Entrez un mot de passe valide",
}

export const register = {
	title: "Inscription",
	email: "Adresse courriel",
	pass: "Mot de passe",
	access: "Accéder",
}

export const menu = {
	profile: "Mon profil",
	about: "À propos de RIVRA",
	howto: "Comment utiliser cette app",
	language: "English",
	logout: "Déconnexion",
}

export const profile = {
	title: "Mon profil",
}

export const infos = {
	title: "Scan",
}

export const unit = {
	title: "Unité",
	newunit: "Nouvelle unité",
	unitId: "Identifiant de l'unité",
	unitType: "Type d'unité",
	location: "Localisation",
	destination: "Destination",
	brandModel: "Marque et modèle",
	brand: "Marque",
	model: "Modèle",
	year: "Année",
	haloType: "Halocarbure",
	haloQty: "Quantité (kg)",
	weight: "Poids de l'unité",
	serialNumber: "Numéro de série",
	provenance: "Provenance",
	mrc : "MRC",
	receptionDate: "Date de réception",
	transporter: "Transporteur",
	destinataire: "Organisation",
	receptionEmployee: "Employé à la réception",
	degassingDate : "Date de dégazage",
	degassingEmployee: "Employé au dégazage",
	storingDate : "Date d'entreposage",
	dismantlingDate : "Début du démantèlement",
	searchbrandmodel : "Taper quelques lettres...",
	notfound : "Introuvable",
}

export const tank = {
	title: "Bonbonne",
	newtank: "Nouvelle bonbonne",
	tankId: "Identifiant de la bonbonne",
	tankType: "Type de bonbonne",
	location: "Localisation",
	creationDate: "Date de création",
	haloType: "Halocarbure",
	haloQty: "Quantité (kg)",
	partialQty: "Total partiel (kg)",
	fullDate: "Date de remplissage",
	disposalDate: "Date de départ",
	ticketId: "Numéro de ticket",
	disposalEmployee: "Employé",
	provider: "Fournisseur",
	error: "Ceci n'est pas une bonbonne",
}

export const bin = {
	title: "Bac",
	newbin: "Nouveau bac",
	binId: "Identifiant du bac",
	binType: "Type de bac",
	location: "Localisation",
	creationDate: "Date de création",
	quantity: "Quantité (kg)",
	fullDate: "Date de remplissage",
	disposalDate: "Date de départ",
	ticketId: "Numéro de ticket",
	disposalEmployee: "Employé",
	provider: "Fournisseur"
}

export const unittype = {
	title: "Types d'unités",
	company: "Compagnie",
	model: "Modèle",
	years: "Période",
	serial: "Numéro de série",
	unitType: "Type d'unité",
	haloType: "Halocarbure",
	quantity: "Quantité (kg)",
	weight: "Poids",
}

export const measure = {
	title: "Mesure",
	lbs: "(lbs)",
	kg: "(kg)",
	liters: "(litres)",
}

export const scan = {
	title: "Scanner un code QR",
}

export const overview = {
	title: "Survol",
}

export const settings = {
	title: "Paramètres",
	section1: "MODÈLES",
	brandModel: "Marques et modèles",
	section2: "TABLES",
	halocarbon: "Halocarbures",
	unitType: "Types d'unité",
	tankType: "Types de bonbonne",
	binType: "Types de bac",
	provenance: "Provenances",
	transporter: "Transporteurs",
	provider: "Fournisseurs",
	organization: "Organizations",
	location: "Localisations",
	destination: "Destinations",
	mrc: "MRC",
	section3: "MESURES",
	scale: "Balances",
	listcontent: "Table",
}

export const process = {
	title: "Processus",
	scanagain: "Scanner un autre QR Code",
	newunit: "Nouvelle unité",
	newtank: "Nouvelle bonbonne",
	newbin: "Nouveau bac",

	saveunit: "Sauvegarder l'unité",
	viewunit: "Voir la description",
	degassing: "Enregistrer le dégazage",
	storing: "Entreposer l'unité",
	dismantling: "Débuter le démantèlement",

	savetank: "Sauvegarder la bonbonne",
	viewtank: "Voir la description",
	tankfull: "Marquer comme pleine",
	tankdisposal: "Disposer de la bonbonne",

	savebin: "Sauvegarder le bac",
	viewbin: "Voir la description",
	binfull: "Marquer comme plein",
	bindisposal: "Disposer de ces matières",
}