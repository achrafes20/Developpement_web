// Exécuter le script une fois que le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', function() {

    // Initialisation du canvas du terrain
    const canvas = document.getElementById('pitch'); // Récupère l'élément <canvas> avec l’ID "pitch"
    const ctx = canvas.getContext('2d'); // Récupère le contexte 2D pour dessiner sur le canvas
    
    // Fonction pour dessiner le terrain de football
    function drawPitch() {
        // Fond du terrain (vert)
        ctx.fillStyle = '#238C27'; // Définir la couleur de remplissage du terrain
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Remplir tout le canvas avec la couleur

        // Contour du terrain (rectangle blanc)
        ctx.strokeStyle = 'white'; // Couleur du contour
        ctx.lineWidth = 2; // Épaisseur du trait
        ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30); // Tracer le contour avec une marge

        // Ligne centrale
        ctx.beginPath(); // Début d'un nouveau tracé
        ctx.moveTo(15, canvas.height / 2); // Déplacer le point de départ de la ligne au centre horizontal
        ctx.lineTo(canvas.width - 15, canvas.height / 2); // Tracer la ligne jusqu’à l’autre extrémité
        ctx.stroke(); // Dessiner la ligne

        // Cercle central
        ctx.beginPath(); // Nouveau tracé
        ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2); // Tracer un cercle au centre du terrain
        ctx.stroke(); // Dessiner le cercle

        // Zones de penalty (haut et bas du terrain)
        ctx.strokeRect((canvas.width / 2) - 75, 15, 150, 75); // Zone de penalty supérieure
        ctx.strokeRect((canvas.width / 2) - 75, canvas.height - 90, 150, 75); // Zone de penalty inférieure

        // Petites surfaces (dans les zones de but)
        ctx.strokeRect((canvas.width / 2) - 30, 15, 60, 30); // Petite surface supérieure
        ctx.strokeRect((canvas.width / 2) - 30, canvas.height - 45, 60, 30); // Petite surface inférieure
    }

    drawPitch(); // Appelle la fonction pour dessiner le terrain

    // Fonctionnalité de glisser-déposer des joueurs
    const teamBuilder = {
        position: null, // Liste des positions sur le terrain
        dragSrc: null,  // Source du joueur en cours de glisser
        
        // Initialisation du builder
        init: function() {
            const players = document.querySelectorAll('.team-builder-players ul li div'); // Sélectionne tous les éléments joueurs disponibles
            players.forEach(p => {
                // Événement au début du glisser
                p.addEventListener('dragstart', this.dragStart.bind(this), true);
                // Événement à la fin du glisser
                p.addEventListener('dragend', this.dragEnd.bind(this), false);
            });

            // Récupère toutes les positions sur le terrain
            this.position = document.querySelectorAll('#starting_11 li');
            this.position.forEach(pos => {
                // Événements pour le dépôt
                pos.addEventListener('drop', this.drop.bind(this), false);
                pos.addEventListener('dragenter', this.cancel, false); // Empêche comportement par défaut
                pos.addEventListener('dragover', this.cancel, false);  // Empêche comportement par défaut
            });
        },

        // Début du glisser
        dragStart: function(e) {
            this.dragSrc = e; // Mémorise la source
            e.dataTransfer.setData('text/html', e.target.outerHTML); // Enregistre le HTML de l’élément glissé
            e.dataTransfer.effectAllowed = 'copy'; // Permet uniquement la copie
            
            // Surligne la position correspondante sur le terrain
            this.position.forEach(pos => {
                if (e.currentTarget.parentNode.dataset.pos === pos.dataset.pos) {
                    pos.classList.add('highlight');
                }
            });
        },

        // Début du glisser depuis le terrain (vers une autre position)
        dragStartOver: function(e) {
            this.dragSrc = e;
            e.dataTransfer.setData('text/html', this.innerHTML); // Enregistre le contenu HTML
            e.dataTransfer.effectAllowed = 'move'; // Permet le déplacement
            
            // Surligne la position d’arrivée correspondante
            this.position.forEach(pos => {
                if (e.currentTarget.dataset.pos === pos.dataset.pos) {
                    pos.classList.add('highlight');
                }
            });
        },

        // Lorsqu’un joueur est déposé sur une position
        drop: function(e) {
            this.cancel(e); // Empêche comportement par défaut
            const data = e.dataTransfer.getData('text/html'); // Récupère le HTML de l’élément déplacé
            const target = e.currentTarget; // Élément cible

            // Si un joueur est déjà en place, le retirer
            if (target.innerHTML !== '') {
                this.dragReset(target.lastChild.dataset.player); // Réactive l'ancien joueur
            }

            // Si l’élément vient d’une position existante
            if (this.dragSrc.srcElement?.parentNode?.id === 'starting_11') {
                // Échange des contenus et classes entre source et cible
                const dragSrcClass = this.dragSrc.target.className;
                const targetClass = target.className;
                this.dragSrc.target.innerHTML = this.innerHTML;
                this.dragSrc.target.className = targetClass;
                target.innerHTML = data;
                target.className = dragSrcClass;
            } else {
                // Sinon, insère le nouveau joueur avec un bouton de suppression
                target.innerHTML = '<a class="remove">×</a>' + data;
                document.getElementById(target.id).classList.add('selected');
                if (this.dragSrc.target) this.dragSrc.target.draggable = false; // Désactive le joueur une fois placé
                if (target.lastChild) target.lastChild.setAttribute('draggable', 'false'); // Empêche le joueur d'être glissé à nouveau
            }

            this.dragEnd(); // Nettoyage visuel

            // Autoriser à nouveau le glisser du joueur déplacé
            target.addEventListener('dragstart', this.dragStartOver.bind(this), false);

            // Ajoute un événement sur le bouton de suppression du joueur
            const removeBtn = target.querySelector('.remove');
            if (removeBtn) {
                removeBtn.addEventListener('click', (evt) => {
                    evt.preventDefault(); // Empêche navigation
                    this.removePlayer(target); // Supprime le joueur
                });
            }
        },

        // Supprimer un joueur d'une position
        removePlayer: function(target) {
            const playerName = target.lastChild.dataset.player; // Récupère le nom du joueur
            target.innerHTML = ''; // Vide la case
            target.classList.remove('selected'); // Retire la classe de sélection
            this.dragReset(playerName); // Réactive le joueur dans la liste
        },

        // Fin du glisser
        dragEnd: function() {
            // Supprime tous les surlignages
            this.position.forEach(pos => pos.classList.remove('highlight'));
        },

        // Empêche les actions par défaut du navigateur
        cancel: function(e) {
            e.preventDefault?.(); // Bloque comportement par défaut
            e.stopPropagation?.(); // Empêche propagation de l’événement
            return false;
        },

        // Réactive un joueur dans la liste s’il a été supprimé du terrain
        dragReset: function(name) {
            const player = document.querySelector(`.team-builder-players div[data-player="${name}"]`);
            if (player) player.draggable = true; // Réautorise le drag
        }
    };

    // Initialise le builder
    teamBuilder.init();
});
