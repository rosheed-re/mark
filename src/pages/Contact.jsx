import { useState } from 'react'

export default function Contact() {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', style: 'Fine line', message: '' })

    function handleChange(event) {
        const { name, value } = event.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        // Frontend-only demo: nothing is actually sent anywhere yet.
        // Wire this up to something like Formspree, EmailJS, or your own API
        // when you're ready to actually receive these messages.
        console.log('Consult request:', form)
        setSubmitted(true)
    }

    return (
        <section className="section container contact">
            <div className="contact__intro">
                <p className="eyebrow">Book a consult</p>
                <h1>Tell us what you're after</h1>
                <p className="page-lede">
                    Reference photos help, but a description works too. We'll reply
                    with a sketch direction and a couple of time slots.
                </p>

                <img
                    className="contact__photo"
                    src="https://picsum.photos/seed/truemark-front/700/420?grayscale"
                    alt="True Mark studio storefront — placeholder photo"
                />

                <div className="contact__details">
                    <div>
                        <p className="eyebrow">Studio</p>
                        <p>204 Anchor Row, Unit 3</p>
                        <p>hello@truemark.studio</p>
                        <p>(555) 014-0192</p>
                    </div>
                    <div>
                        <p className="eyebrow">Hours</p>
                        <p>Tue – Sat · 11:00 – 19:00</p>
                        <p>Sun – Mon · Closed</p>
                    </div>
                </div>
            </div>

            <div className="contact__form-wrap">
                {submitted ? (
                    <div className="contact__success">
                        <h3>Got it.</h3>
                        <p>We read every consult request by hand — expect a reply within two business days.</p>
                        <button type="button" className="btn btn--ghost" onClick={() => setSubmitted(false)}>
                            Send another
                        </button>
                    </div>
                ) : (
                    <form className="form" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input type="text" name="name" value={form.name} onChange={handleChange} required />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" value={form.email} onChange={handleChange} required />
                        </label>
                        <label>
                            Style you're after
                            <select name="style" value={form.style} onChange={handleChange}>
                                <option>Fine line</option>
                                <option>Blackwork</option>
                                <option>Bold / traditional</option>
                                <option>Cover-up</option>
                                <option>Not sure yet</option>
                            </select>
                        </label>
                        <label>
                            Tell us about the piece
                            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
                        </label>
                        <button type="submit" className="btn btn--primary">Send request</button>
                    </form>
                )}
            </div>
        </section>
    )
}