const pieces = [
    { name: 'Anchor piece', style: 'Blackwork', img: 'https://picsum.photos/seed/truemark-p1/500/620?grayscale' },
    { name: 'Forearm script', style: 'Fine line', img: 'https://picsum.photos/seed/truemark-p2/500/620?grayscale' },
    { name: 'Crescent moon', style: 'Blackwork', img: 'https://picsum.photos/seed/truemark-p3/500/620?grayscale' },
    { name: 'Storm cloud', style: 'Bold line', img: 'https://picsum.photos/seed/truemark-p4/500/620?grayscale' },
    { name: 'Watcher eye', style: 'Fine line', img: 'https://picsum.photos/seed/truemark-p5/500/620?grayscale' },
    { name: 'Serpent sleeve', style: 'Fine line', img: 'https://picsum.photos/seed/truemark-p6/500/620?grayscale' },
    { name: 'Cover-up rework', style: 'Blackwork', img: 'https://picsum.photos/seed/truemark-p7/500/620?grayscale' },
    { name: 'Flash set', style: 'Bold line', img: 'https://picsum.photos/seed/truemark-p8/500/620?grayscale' },
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