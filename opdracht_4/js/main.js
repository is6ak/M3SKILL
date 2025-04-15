function refreshTime() {
	const current = new Date();
	document.getElementById("liveTime").textContent = current.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});
}
setInterval(refreshTime, 1000);
refreshTime();

new Chart(document.getElementById("deviceStats"), {
	type: 'doughnut',
	data: {
		labels: ['PS Portal', 'Razer Edge', 'AYANEO 2', 'Logitech G Cloud', 'Steam Deck OLED', 'ROG Ally'],
		datasets: [{
			label: 'Portable Devices',
			data: [11, 7, 8, 5, 14, 12],
			backgroundColor: ['#ff6d00', '#00acc1', '#d500f9', '#ff1744', '#ffd600', '#69f0ae']
		}]
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				labels: {
					color: "#ffffff"
				}
			}
		},
		scales: {
			x: {
				ticks: {
					color: "#ffffff"
				}
			},
			y: {
				ticks: {
					color: "#ffffff"
				}
			}
		}
	}
});

async function fetchPokemons() {
	const typeCount = {
		normal: 0, fighting: 0, flying: 0, poison: 0, ground: 0, rock: 0,
		bug: 0, ghost: 0, steel: 0, fire: 0, water: 0, grass: 0,
		electric: 0, psychic: 0, ice: 0, dragon: 0, dark: 0, fairy: 0,
		unknown: 0, shadow: 0
	};

	const palette = [
		'#8e24aa', '#039be5', '#f44336', '#00e676', '#ff9800',
		'#3f51b5', '#cddc39', '#e91e63', '#009688', '#673ab7',
		'#4caf50', '#00bcd4', '#ffc107', '#9c27b0', '#ff5722',
		'#607d8b', '#b0bec5', '#aed581', '#f06292', '#90a4ae'
	];

	for (let i = 0; i < 10; i++) {
		const randomId = Math.floor(Math.random() * 500) + 1;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
		const result = await response.json();

		result.types.forEach(t => {
			const type = t.type.name;
			if (typeCount[type] !== undefined) {
				typeCount[type]++;
			}
		});
	}

	const ctx = document.getElementById("creatureTypes").getContext("2d");
	new Chart(ctx, {
		type: 'bar',
		data: {
			labels: Object.keys(typeCount),
			datasets: [{
				label: 'Creature Types',
				data: Object.values(typeCount),
				backgroundColor: palette
			}]
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					labels: {
						color: "#fff"
					}
				}
			},
			scales: {
				x: {
					ticks: {
						color: "#fff"
					}
				},
				y: {
					ticks: {
						color: "#fff"
					}
				}
			}
		}
	});
}

fetchPokemons();
