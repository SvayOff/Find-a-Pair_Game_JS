document.addEventListener('DOMContentLoaded', () => {
	const game = document.querySelector('.game');

	const startGame = (game, cardsPair) => {
		let firstCard = null;
		let secondCard = null;
		const cards = [];

		createCardsArray(cards, cardsPair);

		mixRandomArray(cards);

		createCards(game, firstCard, secondCard, cards);
	};

	const createCardsArray = (cards, cardsPair) => {
		for (let i = 1; i <= cardsPair; i++) {
			cards.push(i, i);
		}
	};

	const mixRandomArray = (cards) => {
		for (let i = cards.length - 1; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * (i + 1));

			[cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]]
		}
	};

	const createCards = (game, firstCard, secondCard, cards) => {
		for (let cardIndex of cards) {
			const card = document.createElement('div');
			card.classList.add('card');
			card.textContent = cardIndex;

			card.addEventListener('click', (e) => {
				if (
					card.classList.contains('opened') ||
					card.classList.contains('success')
				) {
					return;
				}

				if (firstCard !== null && secondCard !== null) {
					firstCard.classList.remove('opened');
					secondCard.classList.remove('opened');
					firstCard = null;
					secondCard = null;
				}

				card.classList.add('opened');
				lastClickedCard = card;

				if (firstCard === null) {
					firstCard = card;

				} else {
					secondCard = card;
				}

				if (firstCard !== null && secondCard !== null) {
					const firstCardNumber = firstCard.textContent;
					const secondCardNumber = secondCard.textContent;

					if (firstCardNumber === secondCardNumber) {
						firstCard.classList.add('success');
						secondCard.classList.add('success');
					}
				}

				if (cards.length === document.querySelectorAll('.success').length) {
					setTimeout(() => {
						game.innerHTML = '';

						alert('Game Over. Congrat!!!');

						const cardsPair = Number(prompt('Enter the number of pairs', 2));
						startGame(game, cardsPair);
					}, 400);
				}
			});

			game.append(card);
		}
	};

	const cardsPair = Number(prompt('Enter the number of pairs', 2));
	startGame(game, cardsPair);
}); 