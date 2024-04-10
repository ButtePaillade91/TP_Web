# Taki_TP_Web


1/ Un fichier .json est un fichier texte qui est composé d'une arborescence et des informations sous forme de blocs. Lorsque "npm install" est exécuté, un fichier .json nommé package-lock.json est créé pour enregistrer tous les paramètres de notre projet ainsi que les dépendances. Si une autre personne télécharge mon projet, elle pourra se servir de mon .json pour télécharger les dépendances, elle aura donc le même projet fonctionnel que moi.

2/ Utiliser un format à trois chiffres pour les numéros de version dans les dépendances NPM est couramment appelée le Versionnement Sémantique :
•	Première version = Nouveau produit = Commencer par la version 1.0.0 = VS : 1.0.0
•	Corrections de bogues rétrocompatibles amène à une publication du correctif = Incrémentation du troisième chiffre = 1.0.1
•	Nouvelles fonctionnalités rétrocompatibles = Version mineure = Incrémenter le chiffre du milieu et remettre le dernier chiffre à zéro = 1.1.0
•	Modifications qui rompent la rétrocompatibilité = Version majeure = Incrémenter le premier chiffre et réinitialiser le deuxième et le dernier chiffre à zéro = 2.0.0

3/ Une "devDependency" est une dépendance logicielle utilisée dans le développement d'une appli ou d'un projet, mais qui n'est pas nécessaire pour son exécution en production. En gros ce sont tous les outils nécessaires comme les bibliothèques ou les test qui ne seront pas fournis dans le package final de l’appli ou webapp (les utilisateurs n’en ont pas besoin).
Contrairement aux devDependency, les dependency sont utiles à l’application quand elle est déployée et pour que les utilisateurs l’utilise.

4/ Les closures sont des fonctions qui capturent des variables de leur environnement extérieur et y ont toujours accès, même après que cet environnement ait été fermé. une closure donne accès à la portée d'une fonction extérieure depuis une fonction interne. En JavaScript, les closures sont créées à chaque fois qu'une fonction est créé, au moment de la création de la fonction. 
Les IIFE (Immediately Invoked Function Expressions) sont des fonctions anonymes définies et immédiatement exécutées. Elles sont utilisées pour encapsuler des variables et gérer la portée des variables.

5/ import * as toto from './utils' importe tous les éléments exportés du module './utils' et les regroupe sous un seul objet nommé toto.
import { parseUrl } from './utils' importe uniquement l'élément nommé parseUrl du module './utils'.
Si on utilise import * as toto from './utils', on obtiend tous les éléments exportés, ce qui peut parfois donner trop de noms. Par contre, avec import { parseUrl } from './utils', on importe que ce dont on a besoin, ce qui peut rendre le code plus clair et plus lisible.

6/ Héritage Multiple : En Java, une classe peut hériter de plusieurs classes à la fois, c’est-à-dire qu’elle peut hériter des propriétés et des méthodes de plusieurs autres classes. Par contre, en ES6, les classes n’ont pas la possibilité d’avoir un héritage multiple. 
Accès Modificateurs : En Java, on peut définir des modificateurs d'accès : public, private, protected… pour contrôler la visibilité des membres (variables et méthodes) d'une classe. Par exemple. En ES6, les classes ne prennent pas en charge les modificateurs d'accès comme ceux de Java, tous les membres d'une classe ES6 sont publics.


7/ La différence principale entre var et let en JavaScript est que var a une portée de fonction, tandis que let a une portée de bloc.
- var : Déclarer une variable avec var la rend accessible dans toute la fonction dans laquelle elle est déclarée, même si elle est déclarée à l'intérieur d'une boucle ou d'une condition.
- let : Déclarer une variable avec let la rend accessible uniquement à l'intérieur du bloc (ensemble de code entre accolades) où elle est déclarée.
En gros, let est plus strict que var en termes de portée, ce qui peut aider à éviter les bugs et les erreurs de portée dans le code JavaScript.

8/ .bind(this) est utilisé pour fixer le contexte (this) d'une fonction à un objet spécifique. En le supprimant, le contexte sera déterminé par la manière dont la fonction est appelée. Les fonctions fléchées, quant à elles, capturent automatiquement le contexte de leur définition, évitant ainsi souvent le besoin d'utiliser .bind(this)

9/ Le symbole "@" dans @babel/*** indique simplement qu’on utilise un package spécifique appartenant à un "scope" particulier ( babel ). En gros, on  importe quelque chose provenant du projet Babel.

10/ les avantage des Pormises sont :
- Facilite le code asynchrone : Les Promises rendent plus facile d'écrire du code qui doit attendre des actions asynchrones comme les requêtes réseau ou l'accès aux fichiers.
- Évite le code désordonné : Elles évitent les enchevêtrements de "callbacks" (fonctions de rappel) et rendent le code plus organisé et plus lisible.
- Gestion des erreurs améliorée : Elles offrent une meilleure façon de gérer les erreurs qui se produisent lors de l'exécution des actions asynchrones.
- Permet la composition : Elles permettent d'enchaîner facilement plusieurs actions asynchrones les unes après les autres.
Les Promises simplifient le travail avec des actions asynchrones, rendent le code plus propre, gèrent les erreurs plus efficacement.

11/ Les mots-clés async / await ont été crée dans la version ECMAScript 2017 (ES8)

12/ La programmation orientée composant rend le code plus maintenable à long terme car elle est considérée comme plus maintenable pour plusieurs raisons :
- Modularité : La programmation orientée composant encourage à découper une application en petits composants réutilisables et indépendants ( facilite sa compréhension, sa maintenance et sa réutilisation).
- Encapsulation : Chaque composant est généralement conçu pour encapsuler sa logique et son état interne. Cela limite les effets de bord et aide à isoler les problèmes, facilitant ainsi le débogage et la correction des erreurs.
- Facilité de collaboration : En divisant une application en composants, il devient plus facile pour les équipes de développement de travailler ensemble sur différents aspects de l'application sans trop de conflict.
- Évolutivité : La programmation orientée composant facilite l'ajout de nouvelles fonctionnalités ou la modification de fonctionnalités existantes, car les changements peuvent être apportés à des composants spécifiques sans perturber le reste de l'application.

13/ La programmation fonctionnelle favorise l'utilisation de fonctions simples et prévisibles pour rendre le code plus facile à comprendre et à maintenir.
- Fonctions pures : Les fonctions sont utilisées de manière à ce qu'elles ne modifient pas les données en dehors d'elles-mêmes et renvoient toujours la même sortie pour une même entrée.
- Immutabilité : Les données ne changent pas une fois qu'elles sont créées. Au lieu de les modifier, de nouvelles données sont créées.
- Fonctions d'ordre supérieur : Les fonctions peuvent être utilisées comme des valeurs, passées en tant qu'arguments à d'autres fonctions ou retournées comme résultats.
- Déclaratif : Plutôt que de dire comment une tâche doit être réalisée, le code se concentre sur ce que la tâche doit accomplir.

14/ la fonction map() permet de transformer les éléments d'un tableau en appliquant une fonction à chaque élément et de retourner un nouveau tableau contenant les résultats.

15/ la fonction filter() permet de sélectionner les éléments d'un tableau qui correspondent à un critère spécifié et de les regrouper dans un nouveau tableau.