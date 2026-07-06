const pieces = [
    { name: 'Anchor piece', style: 'Blackwork', img: 'images/Anchor.jpg' },
    { name: 'Forearm script', style: 'Fine line', img: 'images/Forearm.jpg' },
    { name: 'Crescent moon', style: 'Blackwork', img: 'images/moon.jpg' },
    { name: 'Storm cloud', style: 'Bold line', img: 'images/cloud.jpg' },
    { name: 'Watcher eye', style: 'Fine line', img: 'images/eye.jpg' },
    { name: 'Serpent sleeve', style: 'Fine line', img: 'images/Serpent.jpg' },
    { name: 'Cover-up rework', style: 'Blackwork', img: 'images/Cover.jpg' },
    { name: 'Flash set', style: 'Bold line', img: 'images/Flash.jpg' },
]

export default function Portfolio() {
    return (
        <section className="section container">
            <p className="eyebrow">Portfolio</p>
            <h1>Recent flash & custom work</h1>
            <p className="page-lede">
                Placeholder photos stand in below — swap each image source for a real
                photo of the finished piece once you've got a shoot done.
            </p>
            <div className="portfolio-grid">
                {pieces.map((piece) => (
                    <figure className="portfolio-card" key={piece.name}>
                        <img src={piece.img} alt={`${piece.name} — placeholder photo`} loading="lazy" />
                        <figcaption>
                            <span>{piece.name}</span>
                            <small>{piece.style}</small>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    )
}