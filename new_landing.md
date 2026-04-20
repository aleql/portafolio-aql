I have an existing React portfolio website. I want to add a new landing hero section that creates a strong first impression when someone opens the site.

Context:
- The portfolio already exists and contains normal sections like projects, experience, and contact.
- I do NOT want to redesign the whole portfolio.
- I only want to add a visually impressive landing section at the top of the homepage.
- The portfolio is used to apply to game development and game industry related roles.
- The hero should communicate technical skill, creativity, and game development focus.

Design inspiration:
The inspiration is the classic Red Alert 2 menu style where a central screen displays rotating video feeds, like a tactical monitor or scanner interface.

Reference:
https://www.youtube.com/watch?v=sYxNn5waPH4

Important:
I do NOT want to copy the game UI exactly. I want a modern reinterpretation that fits a professional portfolio.

Goal of the hero:
- Create a memorable first impression
- Show short clips of my game projects
- Give the feeling of a futuristic scanning interface or command monitor
- Suggest technical skill and game development experience

Your task:
1. Propose a landing hero design inspired by the “tactical monitor / scanner” idea.
2. Explain how this hero can be integrated into an existing React portfolio without breaking the current structure.
3. Describe the UI layout in detail.
4. Explain how the rotating project video previews should work.
5. Explain the scanner / sonar effect visually.
6. Propose a React component structure that can be added as a self-contained module.
7. Recommend animation approaches (CSS, GSAP, Framer Motion, or WebGL).
8. Explain how to keep performance good when using video.
9. Provide a fallback for mobile or low-performance devices.
10. Suggest how the hero transitions into the rest of the portfolio content.

Constraints:
- The hero should occupy the first screen of the site.
- It should show looping clips from my game projects.
- The design should feel like a futuristic UI or command display.
- Motion should be subtle and smooth, not overwhelming.
- The rest of the portfolio should remain clean and readable.
- The hero should support autoplay rotation but also allow manual navigation.

Technical context:
- React based portfolio
- Likely using modern frontend tools (Vite / Next / Tailwind possible)
- Videos should be short, muted, and looped
- Avoid very heavy WebGL unless clearly justified

Expected output structure:
1. Hero concept
2. Visual layout description
3. Video rotation logic
4. Scanner animation design
5. React component architecture
6. Integration strategy with an existing portfolio
7. Performance considerations
8. Mobile fallback
9. Implementation plan
10. Example component pseudocode