document.addEventListener("DOMContentLoaded", async () => {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id"); // Si no hay id, será null

	try {
		// Fetch
		const response = await fetch(
			"https://raw.githubusercontent.com/ironhack-jc/mid-term-api/main/projects"
		);
		const data = await response.json();

		// Sort uuid
		const sortedProjects = data.sort(
			(a, b) => Number(b.uuid)
		);

		if (id) {
			// projects.html?id=...
			const project = sortedProjects.find((item) => item.uuid === id);

			if (!project) {
				document.querySelector(".project-section").innerHTML =
					"<p>Project not found.</p>";
				return;
			}

			// Main project selected
			const section = document.querySelector(".project-section");
			section.innerHTML = `
                <h1>${project.name}</h1>
                <h2>${project.description}</h2>
                <p class="date-completed">Completed on ${project.completed_on}</p>
                <img class="project-image" src="${project.image}" alt="${project.name}" />
                <p class="project-description">${project.content}</p>
            `;

			// Other projects
			const otherProjects = sortedProjects.filter(
				(item) => item.uuid !== id
			);
			const otherProjectsContainer = document.querySelector(
				".projects-container"
			);
			otherProjects.forEach((project) => {
				const card = document.createElement("div");
				card.classList.add("project-card");

				card.innerHTML = `
                    <img src="${project.image}" alt="${project.name}" />
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="./projects.html?id=${project.uuid}">Learn more</a>
                `;
				otherProjectsContainer.appendChild(card);
			});
		} else {
			// index.html (no id)
			// Filter uuid 1, 2, 3 (for index)
			const featuredProjects = sortedProjects.filter(project =>
				["1", "2", "3"].includes(project.uuid)
			);

			const container = document.querySelector(".projects-container");
			featuredProjects.forEach((project) => {
				const card = document.createElement("div");
				card.classList.add("project-card");

				card.innerHTML = `
                    <img src="${project.image}" alt="${project.name}" />
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="./projects.html?id=${project.uuid}">Learn more</a>
                `;
				container.appendChild(card);
			});
		}
	} catch (error) {
		console.error("Error fetching projects:", error);
		const section =
			document.querySelector(".project-section") ||
			document.querySelector(".projects-container");
		if (section) section.innerHTML = "<p>Error loading project.</p>";
	}
});
