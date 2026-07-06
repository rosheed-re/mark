const services = [
    { name: 'Flash piece', detail: 'Pre-drawn design, minor placement tweaks only.', price: '$80–150', spec: '1–2 HR' },
    { name: 'Small custom', detail: 'Palm-sized or smaller, original design.', price: '$150–300', spec: '2–3 HR' },
    { name: 'Large custom', detail: 'Half-sleeve, back panel, or anything booked across sessions.', price: '$120 / hr', spec: 'BY SESSION' },
    { name: 'Cover-up & rework', detail: 'Redesigning or rebuilding an existing tattoo.', price: 'from $200', spec: 'CONSULT FIRST' },
    { name: 'Touch-up', detail: 'Line or colour refresh on a True Mark piece.', price: 'Free in 30 days, $40 after', spec: 'BY APPOINTMENT' },
]

export default function Services() {
    return (
        <>
            <section className="page-banner">
                <img src="images/ink.jpg" alt="Tattoo equipment at True Mark — placeholder photo" />
                <div className="page-banner__overlay" />
                <h1 className="page-banner__title">Services & pricing</h1>
            </section>

            <section className="section container">
                <p className="eyebrow">What it costs to get marked</p>
                <p className="page-lede">
                    Every number here is a starting point — custom work gets a fixed
                    quote at your consult, once we know size, placement, and detail.
                </p>
                <div className="pricing-list">
                    {services.map((service) => (
                        <div className="pricing-row" key={service.name}>
                            <div className="pricing-row__name">
                                <h3>{service.name}</h3>
                                <p>{service.detail}</p>
                            </div>
                            <span className="pricing-row__spec">{service.spec}</span>
                            <span className="pricing-row__price">{service.price}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}