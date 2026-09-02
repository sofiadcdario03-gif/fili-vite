import './style.css'
import html2pdf from 'html2pdf.js'

// Configuration - Customize these values
const CONFIG = {
  boyfriendName: "[Boyfriend's Name]",
  loveLetter: `Hi, Fili.

I hope this message finds you well. I wanted to make something cute and sweet for you, just because.

I hope you know that I always appreciate you. I'm sorry if sometimes I fail to make you see or feel just how much you mean to me. I may not always say it the right way, but I hope you know that I notice the little things, and I'm grateful for you.

I love you. You are so special to me, and I genuinely love what we have. I love our little moments, our jokes, our conversations, and just having you in my life.

I love you, Fili. More than I probably know how to put into words.

I hope this little thing makes you smile. ♡`,

  wordleSecretWord: "LOVIE", // 5-letter word
  wordleWinMessage: "You got it. You really do know me.",
  wordleLoseMessage: "Don't worry, you still know my heart.",

  fineCrimes: [
    "Making me miss you",
    "Being too cute",
    "Stealing my attention",
    "Making me smile for no reason",
    "Taking too long to reply",
    "Being unfairly handsome",
    "Not giving me enough hugs",
    "Making me fall for you again"
  ],

  finePunishments: [
    "3 hugs",
    "1 date",
    "5 kisses",
    "Buy me a snack",
    "Call me",
    "Tell me something you love about me",
    "Cuddle with me",
    "Make me laugh"
  ],

  wheelOptions: [
    "Pick our next date",
    "Movie night",
    "Tell me something you love about me",
    "Send me a cute message",
    "Give me a hug",
    "Give me a kiss",
    "Choose our next food",
    "Recreate a favorite memory",
    "Take a photo together",
    "Your choice",
    "Surprise me",
    "Cook together"
  ]
};

// Main App
class RomanticApp {
  constructor() {
    this.isSpinning = false;
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;
    this.currentSlideIndex = 0;
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
    this.setupKeyboardNavigation();
    this.setupDragScroll();
    this.setupTouchNavigation();
    this.setupScrollSnapListener();
    
    // Initialize first slide as centered
    setTimeout(() => {
      this.scrollToSlide(0);
    }, 100);
  }

  render() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="carousel-container">
        <div class="carousel-wrapper" id="carouselWrapper">
          <div class="carousel-track" id="carouselTrack">
            ${this.renderSlides()}
          </div>
        </div>
        
        <div class="carousel-nav">
          <button class="nav-btn" id="prevBtn">←</button>
          <button class="nav-btn" id="nextBtn">→</button>
        </div>
      </div>
    `;

    this.initializeComponents();
  }

  renderSlides() {
    return `
      <div class="carousel-slide">
        ${this.renderLoveLetter()}
      </div>
      <div class="carousel-slide">
        ${this.renderWordle()}
      </div>
      <div class="carousel-slide">
        ${this.renderApplication()}
      </div>
      <div class="carousel-slide">
        ${this.renderFineGenerator()}
      </div>
      <div class="carousel-slide">
        ${this.renderWheel()}
      </div>
    `;
  }

  renderLoveLetter() {
    return `
      <div class="card" data-component="love-letter">
        <div class="card-cover" id="loveLetterCover">
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="card-cover-title">Love Letter</div>
          <div class="card-cover-subtitle">A special message for you</div>
          <div class="card-cover-hint">Click to reveal</div>
        </div>
        <h2>Love Letter</h2>
        <div class="love-letter-spacer"></div>
        <div class="love-letter-container">
          <div class="envelope" id="envelope">
            <div class="envelope-flap"></div>
            <div class="letter">
              <div class="letter-content">
                ${CONFIG.loveLetter.replace(/\n/g, '<br>')}
              </div>
              <button class="btn btn-secondary close-letter-btn" id="closeLetterBtn">Close</button>
            </div>
          </div>
        </div>
        <div class="love-letter-button-container">
          <button class="btn" id="openLetterBtn" style="margin: 0;">Open your letter</button>
        </div>
      </div>
    `;
  }

  renderWordle() {
    return `
      <div class="card" data-component="wordle">
        <div class="card-cover" id="wordleCover">
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="card-cover-title">Fili Wordle</div>
          <div class="card-cover-subtitle">Guess the word about us</div>
          <div class="card-cover-hint">Click to play</div>
        </div>
        <p style="margin-bottom: 20px; color: var(--secondary);">Guess the 5-letter word about us!</p>
        <div class="wordle-container">
          <div class="wordle-grid" id="wordleGrid"></div>
          <div class="wordle-keyboard" id="wordleKeyboard"></div>
          <div class="wordle-message" id="wordleMessage"></div>
        </div>
      </div>
    `;
  }

  renderApplication() {
    return `
      <div class="card" data-component="application">
        <div class="card-cover" id="applicationCover">
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="card-cover-title">Boyfriend Application</div>
          <div class="card-cover-subtitle">Your application needs renewal</div>
          <div class="card-cover-hint">Click to renew</div>
        </div>
        <h2>Boyfriend Application</h2>
        <div class="application-form" id="applicationForm">
          <div class="form-group">
            <label for="applicantName">Name</label>
            <input type="text" id="applicantName" placeholder="Your name">
            <div class="error-message" id="applicantNameError">Please enter your name</div>
          </div>
          <div class="form-group">
            <label for="reason">Why should you be my boyfriend?</label>
            <textarea id="reason" placeholder="Tell me why..."></textarea>
            <div class="error-message" id="reasonError">Please tell me why you should be my boyfriend</div>
          </div>
          <div class="form-group">
            <label for="favoriteThing">Favorite thing about me</label>
            <input type="text" id="favoriteThing" placeholder="I love that you...">
            <div class="error-message" id="favoriteThingError">Please tell me your favorite thing about me</div>
          </div>
          <div class="checkbox-group" id="hugsGroup">
            <input type="checkbox" id="hugs">
            <label for="hugs" style="color: var(--primary);">Willing to provide unlimited hugs?</label>
            <div class="checkbox-group-error" id="hugsError">You must be willing to provide unlimited hugs!</div>
          </div>
          <div class="checkbox-group" id="nonsenseGroup">
            <input type="checkbox" id="nonsense">
            <label for="nonsense" style="color: var(--primary);">Will tolerate my random nonsense?</label>
            <div class="checkbox-group-error" id="nonsenseError">You must tolerate my random nonsense!</div>
          </div>
          <div class="checkbox-group" id="loveForeverGroup">
            <input type="checkbox" id="loveForever">
            <label for="loveForever" style="color: var(--primary);">Agree to love me indefinitely?</label>
            <div class="checkbox-group-error" id="loveForeverError">You must agree to love me indefinitely!</div>
          </div>
          <div style="display: flex; justify-content: flex-end;">
            <button class="btn" id="submitAppBtn">Submit Application</button>
          </div>
        </div>
        <div id="licenseContainer" style="display: none;"></div>
      </div>
    `;
  }

  renderFineGenerator() {
    return `
      <div class="card" data-component="fine-generator">
        <div class="card-cover" id="fineGeneratorCover">
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="card-cover-title">Fine Generator</div>
          <div class="card-cover-subtitle">You've been fined for being too wonderful</div>
          <div class="card-cover-hint">Click to see your crime</div>
        </div>
        <h2>Fine Generator</h2>
        <div class="fine-notice">
          <h3>You've been fined.</h3>
          <p>For being too wonderful</p>
        </div>
        <div class="fine-details" id="fineDetails">
          <p style="color: var(--secondary);">Click below to see your crime</p>
        </div>
        <button class="btn" id="generateFineBtn">Generate My Fine</button>
      </div>
    `;
  }

  renderWheel() {
    return `
      <div class="card" data-component="wheel">
        <div class="card-cover" id="wheelCover">
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="decorative-heart">♥</div>
          <div class="card-cover-title">Wheel of Us</div>
          <div class="card-cover-subtitle">Spin to decide our next adventure</div>
          <div class="card-cover-hint">Click to spin</div>
        </div>
        <h2>Wheel of Us</h2>
        <div class="wheel-container">
          <div class="wheel-pointer"></div>
          <div class="wheel" id="wheel"></div>
        </div>
        <div class="wheel-result" id="wheelResult">
          Spin the wheel to decide our next activity!
        </div>
        <button class="btn" id="spinWheelBtn" style="margin-top: 20px;">Spin the Wheel</button>
      </div>
    `;
  }

  initializeComponents() {
    this.initCovers();
    this.initLoveLetter();
    this.initWordle();
    this.initApplication();
    this.initFineGenerator();
    this.initWheel();
  }

  setupEventListeners() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.scrollDirection('left'));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.scrollDirection('right'));
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.scrollDirection('left');
      if (e.key === 'ArrowRight') this.scrollDirection('right');
    });
  }

  setupTouchNavigation() {
    let touchStartX = 0;
    let touchEndX = 0;

    const wrapper = document.getElementById('carouselWrapper');
    
    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    this.handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        const slides = document.querySelectorAll('.carousel-slide');
        if (diff > 0) {
          // Swipe left - go to next slide
          this.currentSlideIndex = Math.min(slides.length - 1, this.currentSlideIndex + 1);
        } else {
          // Swipe right - go to previous slide
          this.currentSlideIndex = Math.max(0, this.currentSlideIndex - 1);
        }
        this.scrollToSlide(this.currentSlideIndex);
      } else {
        // No significant swipe - snap to nearest slide
        this.snapToNearestSlide();
      }
    };
  }

  setupScrollSnapListener() {
    const wrapper = document.getElementById('carouselWrapper');
    
    // Use scroll event with debounce for better compatibility
    let scrollTimeout;
    wrapper.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.snapToNearestSlide();
      }, 100);
    });
  }

  initCovers() {
    const covers = document.querySelectorAll('.card-cover');
    
    covers.forEach(cover => {
      cover.addEventListener('click', () => {
        this.revealContent(cover);
      });
    });
  }

  revealContent(cover) {
    cover.classList.add('hidden');
    this.createConfetti();
    
    // Add a small delay before allowing interaction with the content
    setTimeout(() => {
      cover.style.display = 'none';
    }, 500);
  }

  setupDragScroll() {
    const wrapper = document.getElementById('carouselWrapper');
    
    wrapper.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.startX = e.pageX - wrapper.offsetLeft;
      this.scrollLeft = wrapper.scrollLeft;
      wrapper.style.cursor = 'grabbing';
    });

    wrapper.addEventListener('mouseleave', () => {
      if (this.isDragging) {
        this.snapToNearestSlide();
      }
      this.isDragging = false;
      wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.snapToNearestSlide();
      }
      this.isDragging = false;
      wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - this.startX) * 2; // Scroll speed
      wrapper.scrollLeft = this.scrollLeft - walk;
    });

    wrapper.style.cursor = 'grab';
  }

  scrollDirection(direction) {
    const wrapper = document.getElementById('carouselWrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (direction === 'left') {
      this.currentSlideIndex = Math.max(0, this.currentSlideIndex - 1);
    } else {
      this.currentSlideIndex = Math.min(slides.length - 1, this.currentSlideIndex + 1);
    }
    
    this.scrollToSlide(this.currentSlideIndex);
  }

  scrollToSlide(index) {
    const wrapper = document.getElementById('carouselWrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    
    if (index < 0 || index >= slides.length) return;
    
    const slide = slides[index];
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
    const wrapperCenter = wrapper.offsetWidth / 2;
    const scrollPosition = slideCenter - wrapperCenter;
    
    wrapper.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    this.currentSlideIndex = index;
  }

  snapToNearestSlide() {
    const wrapper = document.getElementById('carouselWrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const wrapperCenter = wrapper.scrollLeft + wrapper.offsetWidth / 2;
    
    let nearestIndex = 0;
    let nearestDistance = Infinity;
    
    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(wrapperCenter - slideCenter);
      
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    
    this.scrollToSlide(nearestIndex);
  }



  // Love Letter Component
  initLoveLetter() {
    const envelope = document.getElementById('envelope');
    const openBtn = document.getElementById('openLetterBtn');
    const closeBtn = document.getElementById('closeLetterBtn');
    const buttonContainer = document.querySelector('.love-letter-button-container');

    openBtn.addEventListener('click', () => {
      envelope.classList.add('open');
      buttonContainer.style.display = 'none';
      this.createHearts(5);
    });

    closeBtn.addEventListener('click', () => {
      envelope.classList.remove('open');
      envelope.classList.add('closing');
      buttonContainer.style.display = 'flex';

      setTimeout(() => {
        envelope.classList.remove('closing');
      }, 900);
    });
  }

  // Wordle Component
  initWordle() {
    this.wordleState = {
      currentRow: 0,
      currentTile: 0,
      guesses: [],
      gameOver: false
    };

    this.renderWordleGrid();
    this.renderWordleKeyboard();
    this.setupWordleInput();
  }

  renderWordleGrid() {
    const grid = document.getElementById('wordleGrid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('div');
      row.className = 'wordle-row';
      
      for (let j = 0; j < 5; j++) {
        const tile = document.createElement('div');
        tile.className = 'wordle-tile';
        tile.id = `tile-${i}-${j}`;
        row.appendChild(tile);
      }
      
      grid.appendChild(row);
    }
  }

  renderWordleKeyboard() {
    const keyboard = document.getElementById('wordleKeyboard');
    const rows = [
      'QWERTYUIOP',
      'ASDFGHJKL',
      'ZXCVBNM'
    ];

    keyboard.innerHTML = '';

    rows.forEach((row, rowIndex) => {
      row.split('').forEach(letter => {
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = letter;
        key.addEventListener('click', () => this.handleWordleInput(letter));
        keyboard.appendChild(key);
      });

      if (rowIndex === 2) {
        const enterKey = document.createElement('button');
        enterKey.className = 'key key-wide';
        enterKey.textContent = 'ENTER';
        enterKey.addEventListener('click', () => this.handleWordleEnter());
        keyboard.appendChild(enterKey);

        const backspaceKey = document.createElement('button');
        backspaceKey.className = 'key key-wide';
        backspaceKey.textContent = '⌫';
        backspaceKey.addEventListener('click', () => this.handleWordleBackspace());
        keyboard.appendChild(backspaceKey);
      }
    });
  }

  setupWordleInput() {
    document.addEventListener('keydown', (e) => {
      if (this.wordleState.gameOver) return;

      // Check if Wordle slide is the current active slide
      const wrapper = document.getElementById('carouselWrapper');
      const wordleSlide = document.querySelectorAll('.carousel-slide')[1];
      if (!wordleSlide) return;

      const slideStart = wordleSlide.offsetLeft;
      const slideEnd = slideStart + wordleSlide.clientWidth;
      const viewStart = wrapper.scrollLeft;
      const viewEnd = viewStart + wrapper.clientWidth;

      // Only process input if Wordle slide is the main visible slide (centered)
      const slideCenter = slideStart + wordleSlide.clientWidth / 2;
      const viewCenter = viewStart + wrapper.clientWidth / 2;
      const distanceFromCenter = Math.abs(slideCenter - viewCenter);

      // Allow input if the slide is mostly centered (within 200px of center)
      if (distanceFromCenter > 200) return;

      const key = e.key.toUpperCase();

      if (key === 'ENTER') {
        this.handleWordleEnter();
      } else if (key === 'BACKSPACE') {
        this.handleWordleBackspace();
      } else if (/^[A-Z]$/.test(key)) {
        this.handleWordleInput(key);
      }
    });
  }

  handleWordleInput(letter) {
    if (this.wordleState.currentTile < 5) {
      const tile = document.getElementById(`tile-${this.wordleState.currentRow}-${this.wordleState.currentTile}`);
      if (tile) {
        tile.textContent = letter;
        tile.classList.add('filled');
        this.wordleState.currentTile++;
      }
    }
  }

  handleWordleBackspace() {
    if (this.wordleState.currentTile > 0) {
      this.wordleState.currentTile--;
      const tile = document.getElementById(`tile-${this.wordleState.currentRow}-${this.wordleState.currentTile}`);
      tile.textContent = '';
      tile.classList.remove('filled');
    }
  }

  handleWordleEnter() {
    if (this.wordleState.currentTile !== 5) return;

    let guess = '';
    for (let i = 0; i < 5; i++) {
      const tile = document.getElementById(`tile-${this.wordleState.currentRow}-${i}`);
      if (tile) {
        guess += tile.textContent || '';
      }
    }

    if (guess.length === 5) {
      this.checkWordleGuess(guess);
    }
  }

  checkWordleGuess(guess) {
    const secret = CONFIG.wordleSecretWord;
    const messageEl = document.getElementById('wordleMessage');

    if (!messageEl) return;

    if (guess === secret) {
      // Correct guess
      for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${this.wordleState.currentRow}-${i}`);
        if (tile) {
          tile.classList.add('correct');
        }
      }

      messageEl.textContent = CONFIG.wordleWinMessage;
      this.wordleState.gameOver = true;
      this.createConfetti();
    } else {
      // Check letters
      const secretLetters = secret.split('');
      const guessLetters = guess.split('');
      const result = new Array(5).fill('absent');

      // First pass: find correct letters
      for (let i = 0; i < 5; i++) {
        if (guessLetters[i] === secretLetters[i]) {
          result[i] = 'correct';
          secretLetters[i] = null;
          guessLetters[i] = null;
        }
      }

      // Second pass: find present letters
      for (let i = 0; i < 5; i++) {
        if (guessLetters[i] && secretLetters.includes(guessLetters[i])) {
          result[i] = 'present';
          const idx = secretLetters.indexOf(guessLetters[i]);
          secretLetters[idx] = null;
        }
      }

      // Apply results with animation
      for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`tile-${this.wordleState.currentRow}-${i}`);
        if (tile) {
          setTimeout(() => {
            tile.classList.add(result[i]);
          }, i * 100);
        }
      }

      // Update keyboard
      for (let i = 0; i < 5; i++) {
        const letter = guess[i];
        const key = Array.from(document.querySelectorAll('.key')).find(k => k.textContent === letter);
        if (key) {
          if (result[i] === 'correct') {
            key.classList.remove('present', 'absent');
            key.classList.add('correct');
          } else if (result[i] === 'present' && !key.classList.contains('correct')) {
            key.classList.remove('absent');
            key.classList.add('present');
          } else if (!key.classList.contains('correct') && !key.classList.contains('present')) {
            key.classList.add('absent');
          }
        }
      }

      this.wordleState.currentRow++;
      this.wordleState.currentTile = 0;

      if (this.wordleState.currentRow >= 6) {
        messageEl.textContent = `${CONFIG.wordleLoseMessage} The word was: ${secret}`;
        this.wordleState.gameOver = true;
      }
    }
  }

  // Application Component
  initApplication() {
    const submitBtn = document.getElementById('submitAppBtn');

    submitBtn.addEventListener('click', () => {
      // Clear previous errors
      this.clearValidationErrors();

      // Validate form fields
      const name = document.getElementById('applicantName').value.trim();
      const reason = document.getElementById('reason').value.trim();
      const favoriteThing = document.getElementById('favoriteThing').value.trim();
      const hugs = document.getElementById('hugs').checked;
      const nonsense = document.getElementById('nonsense').checked;
      const loveForever = document.getElementById('loveForever').checked;

      let hasErrors = false;

      // Check for empty fields
      if (!name) {
        this.showFieldError('applicantName', 'applicantNameError');
        hasErrors = true;
      }

      if (!reason) {
        this.showFieldError('reason', 'reasonError');
        hasErrors = true;
      }

      if (!favoriteThing) {
        this.showFieldError('favoriteThing', 'favoriteThingError');
        hasErrors = true;
      }

      // Check if checkboxes are checked
      if (!hugs) {
        this.showCheckboxError('hugsGroup', 'hugsError');
        hasErrors = true;
      }

      if (!nonsense) {
        this.showCheckboxError('nonsenseGroup', 'nonsenseError');
        hasErrors = true;
      }

      if (!loveForever) {
        this.showCheckboxError('loveForeverGroup', 'loveForeverError');
        hasErrors = true;
      }

      if (hasErrors) {
        return;
      }

      this.showLoading();

      setTimeout(() => {
        this.showLicense();
      }, 2000);
    });

    // Add real-time error clearing
    this.setupRealTimeValidation();
  }

  clearValidationErrors() {
    // Clear all field errors
    const fields = ['applicantName', 'reason', 'favoriteThing'];
    fields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const errorEl = document.getElementById(fieldId + 'Error');
      if (field) field.classList.remove('error');
      if (errorEl) errorEl.classList.remove('visible');
    });

    // Clear all checkbox errors
    const checkboxGroups = ['hugsGroup', 'nonsenseGroup', 'loveForeverGroup'];
    checkboxGroups.forEach(groupId => {
      const group = document.getElementById(groupId);
      const errorEl = document.getElementById(groupId.replace('Group', 'Error'));
      if (group) group.classList.remove('error');
      if (errorEl) errorEl.classList.remove('visible');
    });
  }

  showFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.add('error');
    if (errorEl) errorEl.classList.add('visible');
  }

  showCheckboxError(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorEl = document.getElementById(errorId);
    if (group) group.classList.add('error');
    if (errorEl) errorEl.classList.add('visible');
  }

  setupRealTimeValidation() {
    // Clear errors when user starts typing in text fields
    const textFields = ['applicantName', 'reason', 'favoriteThing'];
    textFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('input', () => {
          const errorEl = document.getElementById(fieldId + 'Error');
          if (field.classList.contains('error')) {
            field.classList.remove('error');
            if (errorEl) errorEl.classList.remove('visible');
          }
        });
      }
    });

    // Clear errors when user checks checkboxes
    const checkboxes = ['hugs', 'nonsense', 'loveForever'];
    checkboxes.forEach(checkboxId => {
      const checkbox = document.getElementById(checkboxId);
      if (checkbox) {
        checkbox.addEventListener('change', () => {
          const groupId = checkboxId + 'Group';
          const group = document.getElementById(groupId);
          const errorEl = document.getElementById(checkboxId + 'Error');
          if (group && group.classList.contains('error')) {
            group.classList.remove('error');
            if (errorEl) errorEl.classList.remove('visible');
          }
        });
      }
    });
  }

  showLoading() {
    const form = document.getElementById('applicationForm');
    form.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
        <div class="loading">
          <div class="loading-dot"></div>
          <div class="loading-dot"></div>
          <div class="loading-dot"></div>
        </div>
        <p style="margin-top: 20px; color: var(--secondary);">Application under review...</p>
      </div>
    `;
  }

  showLicense() {
    const form = document.getElementById('applicationForm');
    const container = document.getElementById('licenseContainer');
    const name = document.getElementById('applicantName')?.value || CONFIG.boyfriendName;
    const licenseNumber = this.generateLicenseNumber();
    
    // Hide the form (loading message)
    if (form) {
      form.style.display = 'none';
    }
    
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <h3 style="color: var(--success); font-size: 1.5rem;">APPLICATION APPROVED</h3>
      </div>
      ${this.renderLicense(name, licenseNumber)}
    `;
    container.style.display = 'block';
    
    // Add PDF generation functionality after a small delay to ensure DOM is ready
    setTimeout(() => {
      const saveBtn = document.getElementById('saveLicenseBtn');
      if (saveBtn) {
        saveBtn.addEventListener('click', () => this.generatePDF());
      }
    }, 100);
    
    this.createConfetti();
  }

  generatePDF() {
    const licenseCard = document.getElementById('licenseCardContent');
    if (!licenseCard) return;

    const opt = {
      margin: 10,
      filename: 'boyfriend-license.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Show loading state on button
    const saveBtn = document.getElementById('saveLicenseBtn');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving License...';
    saveBtn.disabled = true;

    html2pdf().set(opt).from(licenseCard).save().then(() => {
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
    }).catch((error) => {
      console.error('PDF generation failed:', error);
      saveBtn.textContent = originalText;
      saveBtn.disabled = false;
      alert('Failed to save license. Please try again.');
    });
  }

  generateLicenseNumber() {
    return 'BF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  renderLicense(name, licenseNumber) {
    const today = new Date().toLocaleDateString();
    
    return `
      <div class="license-card" id="licenseCardContent">
        <div class="license-stamp">APPROVED</div>
        <div class="license-header">
          <h3>OFFICIAL BOYFRIEND LICENSE</h3>
          <div class="license-number">${licenseNumber}</div>
        </div>
        
        <div class="license-content-row">
          <div class="license-photo">
            <img src="/src/assets/photo.jpg" alt="License Photo" class="license-photo-img">
          </div>
          
          <div class="license-body">
            <div class="license-field">
              <span class="license-label">Name:</span>
              <span class="license-value">${name}</span>
            </div>
            <div class="license-field">
              <span class="license-label">Status:</span>
              <span class="license-value">Taken</span>
            </div>
            <div class="license-field">
              <span class="license-label">Issue Date:</span>
              <span class="license-value">${today}</span>
            </div>
            <div class="license-field">
              <span class="license-label">Valid Until:</span>
              <span class="license-value">Forever</span>
            </div>
            <div class="license-field">
              <span class="license-label">Primary Responsibility:</span>
              <span class="license-value">Love me</span>
            </div>
            <div class="license-field">
              <span class="license-label">Secondary Responsibility:</span>
              <span class="license-value">Snacks & hugs</span>
            </div>
          </div>
        </div>
        
        <div class="license-footer">
          <p>This license is non-transferable and valid indefinitely.</p>
          <p>Terms: Unlimited cuddles, mandatory date nights, and eternal love required.</p>
        </div>
      </div>
      <button class="btn btn-secondary" id="saveLicenseBtn" style="margin-top: 20px; width: 100%;">
        Save My License
      </button>
    `;
  }

  // Fine Generator Component
  initFineGenerator() {
    const generateBtn = document.getElementById('generateFineBtn');
    
    generateBtn.addEventListener('click', () => {
      this.generateFine();
    });
  }

  generateFine() {
    const details = document.getElementById('fineDetails');
    const crime = CONFIG.fineCrimes[Math.floor(Math.random() * CONFIG.fineCrimes.length)];
    const punishment = CONFIG.finePunishments[Math.floor(Math.random() * CONFIG.finePunishments.length)];
    
    details.classList.add('fine-animation');
    
    setTimeout(() => {
      details.innerHTML = `
        <div class="fine-crime">CRIME: ${crime}</div>
        <div class="fine-punishment">FINE: ${punishment}</div>
      `;
      details.classList.remove('fine-animation');
    }, 300);
  }

  // Wheel Component
  initWheel() {
    this.renderWheelSegments();
    
    const spinBtn = document.getElementById('spinWheelBtn');
    spinBtn.addEventListener('click', () => this.spinWheel());
  }

  renderWheelSegments() {
    const wheel = document.getElementById('wheel');
    const options = CONFIG.wheelOptions;
    const segmentAngle = 360 / options.length;

    wheel.innerHTML = '';

    // Create SVG wheel for better text rendering
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '-150 -150 300 300');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');

    const colors = ['#561c24', '#6d2932', '#c7b7a3', '#e8d8c4', '#8b3a3a', '#a04040', '#d4a574', '#f0d9b5', '#7a2e2e', '#9e3a3a', '#e0c4a8', '#f5e6d3'];

    options.forEach((option, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle;

      // Create pie slice path
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);

      const x1 = Math.cos(startRad) * 140;
      const y1 = Math.sin(startRad) * 140;
      const x2 = Math.cos(endRad) * 140;
      const y2 = Math.sin(endRad) * 140;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M 0 0 L ${x1} ${y1} A 140 140 0 0 1 ${x2} ${y2} Z`);
      path.setAttribute('fill', colors[index % colors.length]);
      path.setAttribute('stroke', '#561c24');
      path.setAttribute('stroke-width', '1');

      svg.appendChild(path);

      // Add text
      const textAngle = startAngle + (segmentAngle / 2);
      const textRad = (textAngle - 90) * (Math.PI / 180);
      const textX = Math.cos(textRad) * 90;
      const textY = Math.sin(textRad) * 90;

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', textX);
      text.setAttribute('y', textY);
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', '8');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('transform', `rotate(${textAngle + 90}, ${textX}, ${textY})`);
      text.textContent = option;

      svg.appendChild(text);
    });

    wheel.appendChild(svg);
  }

  spinWheel() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    const wheel = document.getElementById('wheel');
    const resultEl = document.getElementById('wheelResult');
    const options = CONFIG.wheelOptions;
    
    const randomDegree = Math.floor(Math.random() * 360) + 1800; // At least 5 full rotations
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    
    setTimeout(() => {
      const actualDegree = randomDegree % 360;
      const segmentAngle = 360 / options.length;
      const winningIndex = Math.floor((360 - actualDegree) / segmentAngle) % options.length;
      
      resultEl.textContent = `${options[winningIndex]}!`;
      this.isSpinning = false;
      this.createConfetti();
    }, 4000);
  }

  // Animation Effects
  createConfetti() {
    const colors = ['#561c24', '#6d2932', '#c7b7a3', '#e8d8c4', '#ff6b6b', '#ff8e8e'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }
  }

  createHearts(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = 'Heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 50 + 50 + 'vh';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 2000);
      }, i * 200);
    }
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  new RomanticApp();
});