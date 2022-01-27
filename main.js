anime.onSnapshot(snap => {
    snap.docChanges().forEach(element => {
        addAnime(element.doc.data(), element.doc.id);
    })
})



addAnime = (anime, id) => {
    let addNewAnime = document.getElementById('addNewAnime');
    const html = `
                        <div class="bg-gray-300 rounded-xl " id="`+ id +`">
                             <figcaption class="font-medium ">
                                <div class="text-sky-500 dark:text-sky-400 text-3xl">
                                   ` + anime.name + `
                                </div>
                                <div class="text-slate-700 dark:text-slate-500">
                                `+ anime.date.toDate() + `
                                </div>
                            </figcaption>
                            <blockquote>
                                <p class="text-lg font-medium">
                                `+ anime.story + `
                                </p>
                            </blockquote>
                            <div class="mt-8">
                            <a  class="p-4 m-8 bg-red-700 text-white rounded-xl" onclick="deleteAnime('`+ id + `')" >DELETE</a>
                            </div>
                        </div>
    `
    addNewAnime.innerHTML += html;
}

function addNewAnime() {
    const date = new Date();
    let animeName = document.getElementById('animeName').value;
    let animeStory = document.getElementById('animeStory').value;
    const addonother = {
        name: animeName,
        story: animeStory,
        date: firebase.firestore.Timestamp.fromDate(date)

    }
    anime.add(addonother)
        .then(res => console.log(res))
        .catch(err => console.log(err));
}
function deleteAnime(id) {
    let deleteAnime = document.getElementById(id)
    deleteAnime.remove();
    anime.doc(id).delete();
}