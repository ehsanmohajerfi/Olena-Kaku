"use client";

import { type FormEvent, useEffect, useState } from "react";

const gallery = Array.from({ length: 23 }, (_, i) => `/cakes/cake-${String(i + 1).padStart(2, "0")}.jpeg`);

export default function Home() {
  const [lang, setLang] = useState<"fi" | "en">("fi");
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([]);
  const fi = lang === "fi";

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const greeting = fi
    ? "Hei! Olen Olenan kakkuapuri. Kysy sijainnista, hinnoista, mauista tai tilaamisesta."
    : "Hi! I’m Olena’s cake assistant. Ask me about location, prices, flavours or ordering.";

  const getAnswer = (question: string) => {
    const q = question.toLocaleLowerCase(fi ? "fi" : "en");
    if (/missä|sijaint|jyväskyl|where|location|based/.test(q)) return fi
      ? "Olena leipoo tällä hetkellä Jyväskylässä, Suomessa."
      : "Olena currently bakes in Jyväskylä, Finland.";
    if (/hint|maks|edull|price|cost|reasonable|cheap/.test(q)) return fi
      ? "Olena ei julkaise hintoja eikä ota tilauksia ennen kuin elintarvike- ja veroasiat on selvitetty. Myöhemmin hinta määräytyy koon, täytteiden ja koristelun mukaan."
      : "Olena is not publishing prices or accepting orders until the food-safety and tax requirements are confirmed. Later, prices will depend on size, fillings and decoration.";
    if (/maku|täyte|pohj|flavour|flavor|filling|base/.test(q)) return fi
      ? "Vaihtoehtoina ovat esimerkiksi vaalea tai suklainen sokerikakkupohja, hunajakakku, lehtitaikina ja marenki sekä monet marja-, hedelmä- ja voidetäytteet."
      : "Options include vanilla or chocolate sponge, honey cake, puff pastry and meringue, plus many berry, fruit and cream fillings.";
    if (/allerg|gluteen|laktoos|diet|vegan/.test(q)) return fi
      ? "Erityistoiveista voidaan keskustella. Kerro kaikki allergiat ja erityisruokavaliot aina tilausta tehdessä."
      : "Special requests can be discussed. Always mention every allergy and dietary requirement when ordering.";
    if (/hygienia|passi|hygiene/.test(q)) return fi
      ? "Kyllä. Olenalla on voimassa oleva hygieniapassi."
      : "Yes. Olena has a valid Finnish Hygiene Passport.";
    if (/laki|säänn|vero|alv|rule|legal|tax|vat/.test(q)) return fi
      ? "Olena selvittää vaatimukset Jyväskylän elintarvikevalvonnan ja Verohallinnon kanssa ennen myynnin aloittamista. Sivun Toiminnan tila -osiossa on viranomaislähteisiin perustuva tarkistuslista."
      : "Olena is confirming the requirements with Jyväskylä food control and the Finnish Tax Administration before sales begin. See the Business status section for a checklist based on official sources.";
    if (/tilaa|yhteys|contact|order|book/.test(q)) return fi
      ? "Tilaukset eivät ole vielä avoinna. Olena selvittää ensin Jyväskylän elintarvikevalvonnan, omavalvonnan ja verotuksen vaatimukset. Voit lähettää vain yleisen kysymyksen sivun lopussa."
      : "Orders are not open yet. Olena is first confirming Jyväskylä food-control, self-monitoring and tax requirements. You may send a general question at the end of the page.";
    return fi
      ? "Voin auttaa sijainnin, hintojen, makujen, allergioiden ja tilaamisen kanssa. Kokeile yhtä alla olevista kysymyksistä."
      : "I can help with location, prices, flavours, allergies and ordering. Try one of the questions below.";
  };

  const askQuestion = (question: string) => {
    const clean = question.trim();
    if (!clean) return;
    setMessages((current) => [...current, { from: "user", text: clean }, { from: "bot", text: getAnswer(clean) }]);
    setChatInput("");
  };

  const submitQuestion = (event: FormEvent) => {
    event.preventDefault();
    askQuestion(chatInput);
  };
  const t = {
    nav: fi ? ["Kakut", "Maut", "Minusta", "Toiminnan tila"] : ["Cakes", "Flavours", "About", "Business status"],
    ask: fi ? "Toiminnan tila" : "Business status",
    eyebrow: fi ? "KÄSIN TEHTY • SINULLE" : "HANDMADE • FOR YOU",
    title: fi ? <>Kakku, joka<br/><em>tuntuu omalta.</em></> : <>A cake that<br/><em>feels like yours.</em></>,
    lead: fi ? "Olena valmistaa uniikit täytekakut juhliin, merkkipäiviin ja elämän makeimpiin hetkiin." : "Olena creates unique celebration cakes for birthdays, milestones and life’s sweetest moments.",
    explore: fi ? "Tutustu kakkuihin" : "Explore the cakes",
    note: fi ? "Jokainen kakku suunnitellaan toiveidesi mukaan" : "Every cake is designed around your wishes",
    introKicker: fi ? "MAKU EDELLÄ" : "FLAVOUR FIRST",
    introTitle: fi ? <>Sinun juhlasi.<br/><i>Sinun makusi.</i></> : <>Your celebration.<br/><i>Your flavour.</i></>,
    intro: fi ? "Klassisesta vaaleasta sokerikakusta suklaiseen, hunajaiseen tai marenkiseen – jokainen kokonaisuus rakennetaan asiakkaan toiveiden ympärille." : "From classic vanilla sponge to chocolate, honey or meringue – every cake is built around the customer’s wishes.",
    cards: fi ? [
      ["Pohjat", "Ilmava vaalea tai suklainen sokerikakkupohja, hunajakakkupohja, lehtitaikina tai marenki."],
      ["Voiteet", "Kermavaahto–mascarpone, kermavaahto, vaniljakreemi ja muut toiveidesi mukaiset vaihtoehdot."],
      ["Täytteet", "Vadelma, mansikka, kirsikka, mustikka, herukat sekä muut marjat ja hedelmät."],
    ] : [
      ["Cake bases", "Airy vanilla or chocolate sponge, honey cake, puff pastry or meringue."],
      ["Creams", "Whipped cream–mascarpone, whipped cream, vanilla cream and other options to suit you."],
      ["Fillings", "Raspberry, strawberry, cherry, blueberry, currants and other berries and fruit."],
    ],
    extra: fi ? "Pähkinöitä ja muita aineksia voidaan lisätä toiveiden mukaan. Kerro aina allergioista ja erityisruokavalioista tilausta tehdessä." : "Nuts and other ingredients can be added on request. Please always mention allergies and dietary needs when ordering.",
    workKicker: fi ? "VIIMEAIKAISIA TÖITÄ" : "RECENT WORK",
    workTitle: fi ? "Kakkuja, joilla on tarina" : "Cakes with a story",
    workText: fi ? "Syntymäpäivä, vuosipäivä tai aivan tavallinen päivä, josta haluat erityisen." : "A birthday, anniversary or simply an ordinary day you want to make special.",
    aboutKicker: fi ? "TEKIJÄ" : "THE MAKER",
    aboutTitle: fi ? <>Hei, olen <i>Olena.</i></> : <>Hi, I’m <i>Olena.</i></>,
    aboutText: fi ? "Rakastan yhdistää tuttuja, rakastettuja makuja asiakkaan omaan ideaan. Kakku voi olla klassinen ja hillitty tai värikäs ja leikkisä – tärkeintä on, että se maistuu ja tuntuu juuri teidän juhlaltanne." : "I love combining familiar, beloved flavours with each customer’s own idea. A cake can be classic and understated or colourful and playful – what matters is that it tastes and feels just right for your celebration.",
    hygiene: fi ? "Voimassa oleva hygieniapassi" : "Valid Finnish Hygiene Passport",
    orderKicker: fi ? "YLEISET KYSYMYKSET" : "GENERAL QUESTIONS",
    orderTitle: fi ? "Haluatko jättää viestin?" : "Would you like to leave a message?",
    orderText: fi ? "Tilaukset eivät ole vielä avoinna. Lomakkeella voi lähettää yleisen kysymyksen tai yhteydenottopyynnön tulevaisuutta varten." : "Orders are not open yet. You may use the form for a general question or a future contact request.",
    message: fi ? "Yleinen yhteydenotto" : "General enquiry",
    contactNote: fi ? "kysy tilauksesta." : "ask for orders.",
    footer: fi ? "Käsintehty rakkaudella" : "Handmade with love",
  };

  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top">OLENA <span>KAKUT</span></a>
        <nav aria-label={fi ? "Päävalikko" : "Main navigation"}>
          <a href="#cakes">{t.nav[0]}</a><a href="#flavours">{t.nav[1]}</a><a href="#about">{t.nav[2]}</a><a href="#readiness">{t.nav[3]}</a>
        </nav>
        <div className="navActions">
          <button className="lang" onClick={() => setLang(fi ? "en" : "fi")} aria-label={fi ? "Switch to English" : "Vaihda suomeksi"}>{fi ? "EN" : "FI"}</button>
          <a className="order" href="#readiness">{t.ask}</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy"><p className="eyebrow">{t.eyebrow}</p><h1>{t.title}</h1><p className="lead">{t.lead}</p><a className="primary" href="#cakes">{t.explore}<span>→</span></a></div>
        <div className="heroVisual"><div className="photoFrame"><img src="/cakes/hero.jpeg" alt={fi ? "Olenan valmistama kukkakoristeinen kakku" : "A floral cake handmade by Olena"}/></div><p className="note">{t.note}</p></div>
      </section>

      <section className="flavours" id="flavours">
        <div className="sectionIntro"><p className="eyebrow">{t.introKicker}</p><h2>{t.introTitle}</h2><p>{t.intro}</p></div>
        <div className="flavourCards">{t.cards.map((card, i) => <article key={card[0]}><span>0{i + 1}</span><h3>{card[0]}</h3><p>{card[1]}</p></article>)}</div>
        <p className="allergy">{t.extra}</p>
      </section>

      <section className="portfolio" id="cakes">
        <div className="portfolioHead"><div><p className="eyebrow">{t.workKicker}</p><h2>{t.workTitle}</h2></div><p>{t.workText}</p></div>
        <div className="gallery">{gallery.map((src, i) => <figure key={src} className={`g${(i % 7) + 1}`}><img src={src} alt={fi ? `Olenan valmistama koristekakku ${i + 1}` : `Decorated cake handmade by Olena ${i + 1}`} loading={i > 5 ? "lazy" : "eager"}/></figure>)}</div>
      </section>

      <section className="about" id="about">
        <div className="aboutPhoto"><img src="/cakes/cake-03.jpeg" alt={fi ? "Vaalea kukkakoristeinen syntymäpäiväkakku" : "Light floral birthday cake"}/></div>
        <div className="aboutCopy"><p className="eyebrow">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p><div className="hygiene"><b>✓</b><span>{t.hygiene}</span></div></div>
      </section>

      <section className="readiness" id="readiness">
        <div className="readinessIntro"><p className="eyebrow">{fi ? "VASTUULLINEN ALOITUS" : "A RESPONSIBLE START"}</p><h2>{fi ? "Portfolio nyt. Myynti myöhemmin." : "Portfolio now. Sales later."}</h2><p>{fi ? "Olena ei ota tällä hetkellä vastaan kakkujen tilauksia. Ennen kaupallisen toiminnan aloittamista hän selvittää vaatimukset Jyväskylän elintarvikevalvonnan ja Verohallinnon kanssa." : "Olena is not currently accepting cake orders. Before commercial activity begins, she will confirm the requirements with Jyväskylä food control and the Finnish Tax Administration."}</p><div className="statusBadge"><span></span>{fi ? "Tilaukset tauolla" : "Orders paused"}</div></div>
        <div className="rulesGrid">
          {(fi ? [
            ["1", "Elintarvikevalvonta", "Säännöllisestä elintarviketoiminnasta tehdään yleensä ilmoitus sijaintikunnan valvontaan viimeistään neljä viikkoa ennen aloitusta. Paikallinen viranomainen arvioi kotikeittiön ja suunnitellut tuotteet tapauskohtaisesti."],
            ["2", "Omavalvonta ja kylmäketju", "Toiminnassa on hallittava hygienia, raaka-aineet, säilytys, kylmäketju, kuljetus, jäljitettävyys ja poikkeamat. Hygieniapassi on voimassa, mutta se ei yksin korvaa muita velvoitteita."],
            ["3", "Ainesosat ja allergeenit", "Asiakkaalle on annettava oikeat tiedot tuotteesta, erityisesti allergioita ja intoleransseja aiheuttavista aineista. Erityisruokavaliot arvioidaan aina erikseen."],
            ["4", "Tulot ja verotus", "Kaikki myyntitulot voivat olla veronalaista tuloa. Tuloista, menoista ja tositteista pidetään kirjaa. ALV-velvollisuuden raja on 20 000 € kalenterivuodessa; elintarvikkeiden verokanta on 13,5 % vuonna 2026, jos toiminta on ALV-velvollista."],
          ] : [
            ["1", "Food-control registration", "Regular food activity generally requires notification to the local authority at least four weeks before starting. The local authority assesses the home kitchen and planned products case by case."],
            ["2", "Self-monitoring and cold chain", "The operation must manage hygiene, ingredients, storage, cold chain, transport, traceability and problems. A valid Hygiene Passport helps, but does not replace the other duties."],
            ["3", "Ingredients and allergens", "Customers must receive accurate product information, especially about substances that cause allergies or intolerances. Special diets are always assessed separately."],
            ["4", "Income and taxes", "Sales income may be taxable. Income, expenses and receipts must be recorded. The VAT-registration threshold is €20,000 per calendar year; the food VAT rate is 13.5% in 2026 when the activity is VAT-liable."],
          ]).map((rule) => <article key={rule[0]}><span>{rule[0]}</span><div><h3>{rule[1]}</h3><p>{rule[2]}</p></div></article>)}
        </div>
        <div className="officialLinks"><strong>{fi ? "Viralliset ohjeet" : "Official guidance"}</strong><a href="https://www.jyvaskyla.fi/ymparisto/ymparistoterveys/elintarvikevalvonta/elintarviketoiminnan-aloittaminen" target="_blank" rel="noreferrer">Jyväskylän elintarvikevalvonta ↗</a><a href="https://www.ruokavirasto.fi/elintarvikkeet/elintarvikeala/elintarvikeyrityksen-perustaminen-ja-omavalvonta/ilmoita-elintarviketoiminnasta/" target="_blank" rel="noreferrer">Ruokavirasto ↗</a><a href="https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/335806/arvonlis%C3%A4verovelvollisen-opas/" target="_blank" rel="noreferrer">Vero.fi ↗</a></div>
        <p className="legalNote">{fi ? "Tämä yhteenveto ei ole oikeudellista tai verotuksellista neuvontaa. Viranomainen ratkaisee vaatimukset suunnitellun toiminnan perusteella." : "This summary is not legal or tax advice. The relevant authority determines the requirements based on the planned activity."}</p>
      </section>

      <section className="contact" id="contact">
        <div className="contactIntro"><p className="eyebrow">{t.orderKicker}</p><h2>{t.orderTitle}</h2><p>{t.orderText}</p><a className="whatsapp paused" href="https://wa.me/358417251282" target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>041 725 1282</strong><small>{t.contactNote}</small></a></div>
        <form className="contactForm" action="https://formsubmit.co/ehsanmohajer.fi@gmail.com" method="POST">
          <input type="hidden" name="_subject" value="Yleinen yhteydenotto – Olena Kakut"/>
          <input type="hidden" name="_next" value="https://olena-kaku.vercel.app/?sent=1#contact"/>
          <input type="text" name="_honey" className="honeypot" tabIndex={-1} autoComplete="off"/>
          <div className="field"><label htmlFor="name">{fi ? "Nimi" : "Name"}</label><input id="name" name="name" required autoComplete="name"/></div>
          <div className="field"><label htmlFor="email">{fi ? "Sähköposti" : "Email"}</label><input id="email" name="email" type="email" required autoComplete="email"/></div>
          <div className="field"><label htmlFor="phone">{fi ? "Puhelin (valinnainen)" : "Phone (optional)"}</label><input id="phone" name="phone" type="tel" autoComplete="tel"/></div>
          <div className="field"><label htmlFor="message">{fi ? "Viesti" : "Message"}</label><textarea id="message" name="message" rows={5} required></textarea></div>
          <button type="submit">{fi ? "Lähetä viesti" : "Send message"}<span>→</span></button>
          <small className="formNote">{fi ? "Viestisi lähetetään osoitteeseen ehsanmohajer.fi@gmail.com." : "Your message will be sent to ehsanmohajer.fi@gmail.com."}</small>
        </form>
      </section>
      <footer><a className="brand" href="#top">OLENA <span>KAKUT</span></a><div className="footerCredit"><p>{t.footer} · {new Date().getFullYear()}</p><a className="copyright" href="https://ehsanmohajer.fi" target="_blank" rel="noreferrer">© {new Date().getFullYear()} Sani · AI &amp; Software Developer</a></div><button onClick={() => setLang(fi ? "en" : "fi")}>{fi ? "English" : "Suomeksi"}</button></footer>

      <button className={`toTop ${showTop ? "visible" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label={fi ? "Takaisin ylös" : "Back to top"}>↑<span>{fi ? "Ylös" : "Top"}</span></button>

      <div className="chatWidget">
        {chatOpen && <section className="chatPanel" role="dialog" aria-label={fi ? "Kakkuapuri" : "Cake assistant"}>
          <div className="chatHead"><div><small>OLENA KAKUT</small><strong>{fi ? "Kakkuapuri" : "Cake assistant"}</strong></div><button onClick={() => setChatOpen(false)} aria-label={fi ? "Sulje keskustelu" : "Close chat"}>×</button></div>
          <div className="chatBody" aria-live="polite">
            <p className="botMessage">{greeting}</p>
            {messages.map((message, index) => <p key={`${message.from}-${index}`} className={message.from === "bot" ? "botMessage" : "userMessage"}>{message.text}</p>)}
          </div>
          <div className="quickQuestions">
            {(fi ? ["Missä Olena leipoo?", "Mitä kakut maksavat?", "Mitä makuja on?"] : ["Where does Olena bake?", "What do cakes cost?", "Which flavours are available?"]).map((question) => <button key={question} onClick={() => askQuestion(question)}>{question}</button>)}
          </div>
          <form className="chatForm" onSubmit={submitQuestion}><input value={chatInput} onChange={(event) => setChatInput(event.target.value)} placeholder={fi ? "Kirjoita kysymys…" : "Type a question…"} aria-label={fi ? "Kysymys" : "Question"}/><button type="submit" aria-label={fi ? "Lähetä" : "Send"}>→</button></form>
        </section>}
        <button className="chatToggle" onClick={() => setChatOpen((open) => !open)} aria-expanded={chatOpen} aria-label={fi ? "Avaa kakkuapuri" : "Open cake assistant"}><span>{chatOpen ? "×" : "?"}</span>{!chatOpen && (fi ? "Kysy" : "Ask")}</button>
      </div>
    </main>
  );
}
