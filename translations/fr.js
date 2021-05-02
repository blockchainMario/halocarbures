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
	unknown: "Usager ou mot de passe inconnu",
	register: "S'inscrire comme usager",
}

export const register = {
	title: "Inscription",
	organization: "Organisation",
	email: "Adresse courriel",
	pass: "Mot de passe",
	firstname: "Prénom",
	lastname: "Nom de famille",
	jobname: "Poste de travail",
	access: "Accéder",
	confirm: "Confirmer l'inscription",
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
	location: "Dernière étape complété",
	destination: "Destination",
	provider: "Fournisseur",
	brandModel: "Marque et modèle",
	brand: "Marque",
	model: "Modèle",
	year: "Année",
	haloType: "Halocarbure",
	haloQty: "Quantité de gaz (kg)",
	weight: "Poids de l'unité (kg)",
	serialNumber: "Numéro de série",
	provenance: "Provenance",
	mrc : "MRC",
	receptionDate: "Date de réception",
	transporter: "Transporteur",
	destinataire: "Destinataire",
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
	location: "Dernière étape complété",
	creationDate: "Date de création",
	haloType: "Halocarbure",
	haloQty: "Poids final (kg)",
	partialQty: "Niveau actuel (kg)",
	fullDate: "Plein en date du",
	disposalDate: "Date de disposition",
	ticketId: "Numéro de ticket",
	disposalEmployee: "Employé",
	provider: "Fournisseur",
	error: "Ceci n'est pas une bonbonne",
	force: "Fermeture forcée",
	exist: "Vous avez déjà une bonbonne de ",
}

export const bin = {
	title: "Bac",
	newbin: "Nouveau bac",
	binId: "Identifiant du bac",
	binType: "Type de bac",
	location: "Dernière étape complété",
	creationDate: "Date de création",
	quantity: "Poids final (kg)",
	fullDate: "Plein en date du",
	disposalDate: "Date de disposition",
	ticketId: "Numéro de ticket",
	disposalEmployee: "Employé",
	provider: "Fournisseur"
}

export const transfer = {
	title: "Transfert d'unités",
	transferDate: "Date du transfert",
	provider: "Fournisseur",
	fridge10less: "Réfrigérateurs 10p3 et MOINS",
	fridge10more: "Réfrigérateurs 10p3 et PLUS",
	freezer10less: "Congélateurs 10p3 et MOINS",
	freezer10more: "Congélateurs 10p3 et PLUS",
	ticketId: "Numéro de ticket",
	transferEmployee: "Employé",
}

export const unittype = {
	title: "Types d'unités",
	brand: "Marque",
	model: "Modèle",
	years: "Période",
	fromyear: "De l'année",
	toyear: "À l'année",
	serial: "Numéro de série",
	unitType: "Type d'unité",
	haloType: "Halocarbure",
	quantity: "Quantité de gaz (kg)",
	onces: "en onces",
	weight: "Poids de l'unité (kg)",
	alum1: "Aluminium cuivre (kg)",
	alum2: "Aluminium domestique (kg)",
	alum3: "Aluminium mixte (kg)",
	brass: "Brasse jaune (kg)",
	card: "Carte électronique (kg)",
	comp: "Compresseurs (kg)",
	copper2: "Cuivre #2 (kg)",
	copper3: "Cuivre #3 (kg)",
	wire2: "Fils gainés #2 (kg)",
	wire3: "Fils gainés #3 (kg)",
	oils: "Huiles (kg)",
	plas1: "Plastique de couleur (kg)",
	plas2: "Plastique noir (kg)",
	waste: "Rebuts (kg)",
	solids: "Solides huileux (kg)",
	thermo: "Thermomètres (kg)",
	ss304: "s-s 304 (kg)",
	savemodel: "Sauvegarder le modèle",
}

export const measure = {
	title: "Mesure",
	lbs: "(lbs)",
	kg: "(kg)",
	liters: "(litres)",
}

export const main = {
	title: "Courant",
	scantitle: "Scanner",
	scan: "Scanner un autre code QR",
	qrcode: "Code QR",
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
	section4: "BONBONNES",
	listcontent: "Table",
	newitem: "Nouvel item",
	additem: "Ajouter l'item ci-dessus",
	addbrandmodel: "Ajouter un nouveau modèle",
	editbrandmodel: "Modifier ce modèle",
	opentanks: "Bonbonnes ouvertes",
}

export const process = {
	title: "Processus",
	scanagain: "Scanner un autre QR Code",
	newunit: "Nouvelle unité",
	newtank: "Nouvelle bonbonne",
	newbin: "Nouveau bac",

	saveunit: "Sauvegarder pour démantèlement",
	savereuse: "Sauvegarder pour réemploi",
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

	savemodel: "Sauvegarder le type d'unité",

	savetransfer: "Sauvegarder le transfert",
}

export const error = {
	missing: "Les champs marqués d'une étoile* sont obligatoires",
	nan: "Le poids des unités doivent être en kg, ex. 0.153",
	lessthanfive: "La quantité de gaz d'une unité doit être < 5 kg",
	notank: "Aucune bonbonne de ce type : ",
}