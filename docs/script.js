async function fetchData() {
    try {
        const response = await fetch('repos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function renderRepositories() {
    const data = await fetchData();
    const reposContainer = document.getElementById('repos-container');

    data.forEach(repo => {
        const checkMark = repo.PreSaved === "1" ? '✅' : '';

        reposContainer.insertAdjacentHTML('beforeend', `
            <div class="repo-container">
                <p>
                    <a href="${generateFDroidRepoLink(repo)}" class="link">${escapeHTML(repo.Repo)}</a>
                    <a href="${generateFDroidDeepLink(repo)}" class="link">[Click To Add]</a> 
                    ${escapeHTML(repo.Details)} ${checkMark}
                </p>
            </div>
        `);
    });
}

function generateFDroidRepoLink(repo) {
    return `https://${repo.urlprefix}${repo.URL}/${repo.urldata}`;
}

function generateFDroidDeepLink(repo) {
    return `fdroidrepo://${repo.urlprefix}${repo.URL}/${repo.urldata}?fingerprint=${repo.FingerPrint}`;
}

function escapeHTML(html) {
    return document.createElement('div').appendChild(document.createTextNode(html)).parentNode.innerHTML;
}


// Call the render function
renderRepositories();





