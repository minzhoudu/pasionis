export default function ContactPage() {
    return (
        <section className="flex h-screen w-full select-text flex-col items-center justify-center text-lg lg:text-2xl">
            <div className="flex flex-col gap-5 uppercase">
                <p className="text-red-700">
                    Odgovorno lice -
                    <span className="text-primary-foreground">
                        - Mladen Vasić
                    </span>
                </p>

                <p className="text-red-700">
                    Kontakt telefon -
                    <span className="uppercase text-primary-foreground">
                        - <a href="tel:+381695550128">+381 69 5550128</a>
                    </span>
                </p>

                <p className="text-red-700">
                    Instagram -
                    <span className="uppercase text-primary-foreground">
                        -{" "}
                        <a
                            href="https://instagram.com/vasic.7"
                            target="_blank"
                            className="underline"
                        >
                            @vasic.7
                        </a>
                    </span>
                </p>

                <p className="text-red-700">
                    Adresa -
                    <span className="uppercase text-primary-foreground">
                        -{" "}
                        <a
                            href="https://maps.app.goo.gl/xG6FHZwUrZz3Smsm6"
                            target="_blank"
                            className="underline"
                        >
                            kosovska 1, 37000 Kruševac
                        </a>
                    </span>
                </p>
            </div>
        </section>
    );
}
