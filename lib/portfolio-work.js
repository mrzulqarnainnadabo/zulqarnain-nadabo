export const work = [
  {
    slug: "iseyc",
    number: "01",
    category: "INSTITUTIONAL ARCHITECTURE",
    title: "Designing an institution that can work as one system",
    short: "A youth-led institution needs more than a public identity. It needs clear departments, accountable programmes, shared evidence and an operating model people can understand.",
    status: "Institutional system in development",
    role: "Institutional architecture · product strategy · digital systems",
    diagram: ["Institution", "Departments", "Programmes", "Evidence"],
    thesis: "The design challenge was to make ISEYC understandable as a working institution: who owns each responsibility, how programmes are delivered, where evidence comes from and how public engagement leads to accountable action.",
    sections: [
      { heading: "The problem", body: "Organisations often present their mission and activities without showing how the institution actually works. That makes responsibilities difficult to follow and progress difficult to verify." },
      { heading: "The design decision", body: "Start with the institution, then define its departments, programmes and public responsibilities. Supporting software should strengthen this structure rather than become the structure itself." },
      { heading: "How the system is organised", bullets: ["Education & Capacity Building", "Health & Well-being", "Software & Technology", "Civic Department"], body: "The Observatory is a shared evidence resource for every department. The Civic Department owns the Mandate review and publication workflow. Governance and approved authority remain distinct from ordinary staff access." },
      { heading: "What this makes possible", body: "A clearer line from institutional mandate to department ownership, programme delivery, public engagement, evidence and outcomes. It also creates a more honest way to show what is active, what is planned and what still needs verification." }
    ],
    limits: ["This is an institutional architecture and digital operating model in development, not a claim that every department or programme is fully operational.", "Public reports, programme announcements and internal plans must not be presented as verified outcomes."],
    links: [{ label: "ISEYC Civic Mandate", href: "https://2027-street-mandate.vercel.app" }, { label: "Civic Intelligence Observatory", href: "https://iseyc-civic-intelligence-observatory.vercel.app" }]
  },
  {
    slug: "civic-intelligence",
    number: "02",
    category: "CIVIC INTELLIGENCE",
    title: "Connecting community reports to public evidence",
    short: "A connected civic information system that keeps community voice, source-backed evidence and institutional response distinct—and traceable.",
    status: "Connected public pilots · evolving",
    role: "System architecture · evidence design · product development",
    diagram: ["Community report", "Human review", "Public evidence", "Response"],
    thesis: "A public submission form is not an accountability system. The difficult work is preserving the difference between what people report, what evidence supports, what remains unknown and what an institution actually does.",
    sections: [
      { heading: "The problem", body: "Community concerns, public datasets and official announcements are often presented together without enough context. A report can be mistaken for prevalence; an announcement can be mistaken for implementation; an indicator can be mistaken for a complete explanation." },
      { heading: "The system", bullets: ["Civic Mandate — receives and reviews community records before publication.", "Civic Intelligence Observatory — organises public sources, observations, geography and evidence limitations.", "Civic Brain — interprets retrieved evidence and explains what supports an answer and what is still unknown."], body: "These products have distinct responsibilities but share one evidence discipline." },
      { heading: "The operating rule", body: "Community records are not population estimates. Published sources retain their provenance, period, geography and limitations. AI-generated interpretation does not replace source material or human publication authority." },
      { heading: "Current stage", body: "The products are connected through a developing public intelligence workflow. Coverage, data quality and geographic scope are labelled rather than assumed." }
    ],
    limits: ["A published community report does not establish how common an issue is.", "A government announcement is not proof of implementation or verified impact.", "The system must not invent statistics, rankings, endorsements or missing evidence."],
    links: [{ label: "Civic Mandate public pilot", href: "https://2027-street-mandate.vercel.app" }, { label: "Civic Brain", href: "https://iseyc-civic-brain.vercel.app" }, { label: "Observatory repository", href: "https://github.com/mrzulqarnainnadabo/iseyc-civic-intelligence-observatory" }]
  },
  {
    slug: "hubil",
    number: "03",
    category: "BUSINESS OPERATING SYSTEMS",
    title: "Turning client needs into structured delivery",
    short: "A practical operating model for moving from an initial business conversation to diagnosis, an approved scope, delivery, handover and support.",
    status: "Operating architecture · active build",
    role: "Business systems design · workflow architecture · technical implementation",
    diagram: ["Understand", "Scope", "Deliver", "Support"],
    thesis: "Small businesses do not need disconnected digital deliverables. They need a clear path from the problem they describe to a scoped solution, reliable delivery and a useful handover.",
    sections: [
      { heading: "The problem", body: "Client enquiries, project work and follow-up can become fragmented across messages, documents and individual memory. Important context is lost between the first conversation and the actual delivery." },
      { heading: "The workflow", bullets: ["Capture the client's context and business need.", "Prepare a structured diagnostic brief for human review.", "Approve the proposed scope and next communication.", "Connect an active engagement to projects and delivery tasks.", "Record review, handover and any continuing support."], body: "The system is designed around explicit stages and human approval, not automatic promises or unreviewed outreach." },
      { heading: "Design principle", body: "A useful operating system should make the next responsible action obvious. It should also preserve the history of decisions and the relationship between a client, a project and its delivery work." }
    ],
    limits: ["The architecture describes the intended operating workflow; it does not claim verified commercial performance or client outcomes.", "AI-generated briefs remain drafts for human review."],
    links: [{ label: "Hubil FirstLine repository", href: "https://github.com/mrzulqarnainnadabo/hubil-firstline-system" }]
  },
  {
    slug: "mmb-class",
    number: "04",
    category: "EDUCATION TECHNOLOGY",
    title: "Building an admissions and learning operations portal",
    short: "A public programme page connected to registration records and a private workspace for participant screening, admission decisions and class operations.",
    status: "Production portal · operations in use",
    role: "Product architecture · workflow design · technical build",
    diagram: ["Register", "Screen", "Admit", "Teach"],
    thesis: "A class portal should do more than collect names. It should give participants a clear entry point and give the management team a controlled way to review registrations and organise the learning process.",
    sections: [
      { heading: "The problem", body: "A registration form alone leaves management to coordinate participant records, admission decisions, class groups, session details and attendance through disconnected tools." },
      { heading: "The system", bullets: ["Public programme information and registration form.", "Notion-backed participant records and tracking references.", "Private staff workspace for reviewing applications and recording decisions.", "Cohort and session management for confirmed class arrangements.", "Attendance and learning-progress records once sessions begin."], body: "The public and staff experiences have separate access boundaries. Participant data remains server-side; the browser does not receive the Notion integration secret." },
      { heading: "Operational discipline", body: "The portal does not invent class dates, instructors, meeting platforms or a teaching sequence. Management can begin screening registrations while those programme details are still being finalised." }
    ],
    limits: ["Automated email delivery depends on a verified sending domain and provider configuration.", "The shared staff code does not identify individual officers; use it only with trusted MMB personnel.", "Admission decisions remain management decisions, not automated recommendations."],
    links: [{ label: "Open MMB class portal", href: "https://mmb-group-digital-architecture.vercel.app" }, { label: "MMB portal repository", href: "https://github.com/mrzulqarnainnadabo/mmb-group-digital-architecture" }]
  },
  {
    slug: "living-atlas",
    number: "05",
    category: "SPATIAL INTELLIGENCE",
    title: "Making geographic evidence easier to explore",
    short: "An interactive spatial experience that connects place, map layers and research context without presenting imagery or proxies as more authoritative than they are.",
    status: "Research prototype",
    role: "Spatial research · GIS workflow · interface architecture",
    diagram: ["Place", "Source", "Measure", "Interpret"],
    thesis: "A map becomes useful when people can understand what they are looking at, where the information came from, how current it is and what it cannot tell them.",
    sections: [
      { heading: "The problem", body: "Maps can make uncertain information look definitive. Satellite imagery, administrative boundaries, building attributes and environmental indicators each have different dates, resolutions and limitations." },
      { heading: "The approach", body: "The Living Atlas combines an interactive geographic interface with source labels, geographic context and explicit interpretation boundaries. Research workflows are designed to preserve the source extract, measurement method and quality checks." },
      { heading: "Kaduna research example", body: "A reproducible screening workflow uses GRID3 settlement-block data to identify candidate areas for further inspection. It records geometry and attribute checks and uses a projected coordinate system for area measurement." }
    ],
    limits: ["The Kaduna working boundary is a research extent, not a claim about a gazetted legal boundary.", "The screening measure is a relative built-form proxy, not a population or occupancy estimate.", "Satellite mosaics and public basemaps are not live video and have source-specific dates and licences."],
    links: [{ label: "Portfolio research repository", href: "https://github.com/mrzulqarnainnadabo/zulqarnain-nadabo" }]
  },
  {
    slug: "sigma-geo",
    number: "06",
    category: "AI EVALUATION RESEARCH",
    title: "Testing whether AI understands geographic evidence",
    short: "A research concept for evaluating whether AI systems recognise errors in location, scale, provenance and confidence—not just whether an answer sounds plausible.",
    status: "Research concept · benchmark validation pending",
    role: "Evaluation design · spatial reasoning · research framing",
    diagram: ["Provenance", "Spatial fit", "Consistency", "Confidence"],
    thesis: "A model can produce a confident geographical answer from the wrong place, scale or source. Spatial intelligence evaluation should test whether the model recognises those failures.",
    sections: [
      { heading: "The problem", body: "Many model evaluations reward a plausible answer without checking whether the underlying geographic evidence is appropriate. A correct-sounding response can still use the wrong location, outdated source or incompatible spatial scale." },
      { heading: "The evaluation idea", bullets: ["Check whether a source is identifiable and appropriate.", "Test whether the evidence refers to the requested location and scale.", "Look for contradictions between the source and the model's interpretation.", "Assess whether uncertainty is communicated when evidence is incomplete."], body: "The intended evaluation separates grounded reasoning from fluent but unsupported completion." },
      { heading: "Current stage", body: "This remains a research concept. A complete benchmark, independent validation and published evaluation results have not yet been established." }
    ],
    limits: ["No benchmark performance, model ranking or validated result is claimed.", "The framework requires implementation and independent testing before conclusions can be drawn."],
    links: [{ label: "SIGMA-GEO repository", href: "https://github.com/mrzulqarnainnadabo/SIGMA-GEO" }]
  }
];

export const approach = [
  { number: "01", title: "Understand", body: "Study the problem, people, place, evidence and constraints before choosing a solution." },
  { number: "02", title: "Structure", body: "Define responsibilities, information flows, decisions and the operating model." },
  { number: "03", title: "Build", body: "Translate the design into usable digital products, tools and workflows." },
  { number: "04", title: "Verify", body: "Test what works, document what is known and make the remaining gaps visible." }
];
