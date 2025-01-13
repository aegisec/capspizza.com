document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar background opacity on scroll
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('bg-white');
                header.classList.remove('bg-white/90', 'backdrop-blur-sm');
            } else {
                header.classList.add('bg-white/90', 'backdrop-blur-sm');
                header.classList.remove('bg-white');
            }
        });

        // Add smooth reveal animation for trivia sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100');
                    entry.target.classList.remove('opacity-0');
                }
            });
        });

        document.querySelectorAll('.trivia-section').forEach((section) => {
            section.classList.add('opacity-0');
            observer.observe(section);
        });
    }

    // Trivia Game
    const triviaQuestions = [
        {
            question: "What is the capital of California?",
            answers: ["Los Angeles", "San Francisco", "Sacramento", "San Diego"],
            correct: 2
        },
        {
            question: "Which pizza topping is traditionally not found on a Margherita pizza?",
            answers: ["Basil", "Mozzarella", "Tomato", "Pepperoni"],
            correct: 3
        },
        {
            question: "In what year was the first pizzeria in America opened?",
            answers: ["1895", "1905", "1915", "1925"],
            correct: 1
        },
        {
            question: "Which US city is known for its deep-dish pizza?",
            answers: ["New York", "Chicago", "Detroit", "Boston"],
            correct: 1
        },
        {
            question: "What temperature do most pizza ovens reach?",
            answers: ["400°F", "600°F", "800°F", "1000°F"],
            correct: 2
        },
        {
            question: "Which beer style originated in Pilsen, Czech Republic?",
            answers: ["Stout", "IPA", "Pilsner", "Wheat Beer"],
            correct: 2
        },
        {
            question: "What year was CAP's Pizza & Tap House established?",
            answers: ["2015", "2017", "2019", "2021"],
            correct: 1
        },
        {
            question: "What is the most popular pizza topping in America?",
            answers: ["Pepperoni", "Mushrooms", "Extra Cheese", "Sausage"],
            correct: 0
        },
        {
            question: "How many slices are typically in a large pizza?",
            answers: ["6", "8", "10", "12"],
            correct: 1
        },
        {
            question: "Which day of the week is Trivia Night at CAP's?",
            answers: ["Monday", "Tuesday", "Wednesday", "Thursday"],
            correct: 2
        }
    ];

    // Trivia Game Logic
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');
    const scoreElement = document.getElementById('score');

    let currentQuestionIndex = 0;
    let score = 0;

    if (startButton && nextButton) {
        startButton.addEventListener('click', startGame);
        nextButton.addEventListener('click', () => {
            currentQuestionIndex++;
            setNextQuestion();
        });
    }

    function startGame() {
        startButton.classList.add('hidden');
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        if (currentQuestionIndex < triviaQuestions.length) {
            showQuestion(triviaQuestions[currentQuestionIndex]);
        } else {
            questionContainer.innerHTML = `<p class="text-lg font-semibold mb-4">Game Over! Final Score: ${score}/${triviaQuestions.length}</p>`;
            startButton.classList.remove('hidden');
            startButton.textContent = 'Play Again';
        }
    }

    function showQuestion(question) {
        questionContainer.innerHTML = `<p class="text-lg font-semibold mb-4">Question ${currentQuestionIndex + 1}: ${question.question}</p>`;
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerHTML = answer;
            button.classList.add('w-full', 'text-left', 'p-4', 'rounded-lg', 'bg-stone-100', 'hover:bg-stone-200', 'transition-colors');
            button.addEventListener('click', () => selectAnswer(index, question.correct));
            answersContainer.appendChild(button);
        });
    }

    function resetState() {
        nextButton.classList.add('hidden');
        while (answersContainer.firstChild) {
            answersContainer.removeChild(answersContainer.firstChild);
        }
    }

    function selectAnswer(selectedIndex, correctIndex) {
        const buttons = answersContainer.getElementsByTagName('button');
        
        Array.from(buttons).forEach((button, index) => {
            button.disabled = true;
            if (index === correctIndex) {
                button.classList.add('bg-green-200');
            } else if (index === selectedIndex && selectedIndex !== correctIndex) {
                button.classList.add('bg-red-200');
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }

        nextButton.classList.remove('hidden');
    }
});
