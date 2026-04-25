'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Zap, 
  Flame, 
  Target, 
  TrendingUp, 
  Users, 
  Award,
  Clock,
  MapPin,
  Star,
  Dumbbell,
  Heart,
  Brain,
  Timer,
  ChevronDown,
  X,
  MessageSquare,
  Sparkles,
  Trophy,
  Activity,
  Calendar,
  Music,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useWorkoutMode } from '@/context/WorkoutModeContext';

// Animated Counter Component
function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Hero Section
function HeroSection() {
  const { isWorkoutMode } = useWorkoutMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div style={{ y }} className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-red/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 border border-neon-red/50 rounded-full text-neon-red text-sm tracking-[0.3em] uppercase">
            Premium Fitness Platform
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="heading-xl mb-6"
        >
          <span className="block text-white">NO EXCUSES.</span>
          <span className="block text-gradient-red">ONLY RESULTS.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Transform your body. Elevate your life. Join the most advanced fitness community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="btn-primary group">
            Join Now
            <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="btn-secondary group">
            <Play className="inline-block mr-2 w-5 h-5" />
            Watch Video
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { icon: Users, value: 10000, suffix: '+', label: 'Members' },
            { icon: TrendingUp, value: 500000, suffix: 'lbs', label: 'Weight Lost' },
            { icon: Award, value: 2500, suffix: '+', label: 'Transformations' },
            { icon: Star, value: 4.9, suffix: '/5', label: 'Rating' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-neon-red" />
              <div className="text-3xl md:text-4xl font-heading">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>

      {/* Workout Mode Overlay */}
      {isWorkoutMode && (
        <div className="absolute top-20 right-4 bg-neon-red/20 border border-neon-red rounded-lg p-4">
          <div className="flex items-center gap-2 text-neon-red">
            <Timer className="w-5 h-5" />
            <span className="font-bold">WORKOUT MODE</span>
          </div>
        </div>
      )}
    </section>
  );
}

// Fitness Quiz Component
function FitnessQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const questions = [
    {
      question: "What's your primary fitness goal?",
      options: ["Lose Weight", "Build Muscle", "Improve Endurance", "General Fitness"]
    },
    {
      question: "How often can you workout?",
      options: ["2-3 times/week", "4-5 times/week", "Daily", "Weekends Only"]
    },
    {
      question: "What's your experience level?",
      options: ["Beginner", "Intermediate", "Advanced", "Athlete"]
    },
    {
      question: "Preferred workout style?",
      options: ["Strength Training", "Cardio", "HIIT", "Mixed"]
    },
    {
      question: "What's your timeline?",
      options: ["3 months", "6 months", "1 year", "Ongoing"]
    }
  ];

  const profiles = [
    { name: "Fat Burner", description: "High-intensity intervals with cardio focus", color: "neon-red" },
    { name: "Strength Builder", description: "Heavy lifting with progressive overload", color: "neon-green" },
    { name: "Athlete Mode", description: "Performance-focused functional training", color: "neon-blue" },
    { name: "Balanced Beast", description: "Complete body transformation program", color: "neon-red" }
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length < questions.length) {
      setStep(step + 1);
    } else {
      const profileIndex = newAnswers.length % 4;
      setResult(profiles[profileIndex].name);
    }
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-neon-red p-4 rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(255,59,59,0.5)] transition-all"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-secondary border border-white/10 rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <button
              onClick={() => { setIsOpen(false); resetQuiz(); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            {!result ? (
              <>
                <h3 className="heading-sm mb-2">Find Your Perfect Program</h3>
                <p className="text-gray-400 mb-6">Question {step + 1} of {questions.length}</p>
                <h4 className="text-xl mb-6">{questions[step].question}</h4>
                <div className="space-y-3">
                  {questions[step].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left p-4 rounded-lg border border-white/10 hover:border-neon-red hover:bg-neon-red/10 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🔥</div>
                <h3 className="heading-md text-neon-red mb-2">Your Profile: {result}</h3>
                <p className="text-gray-400 mb-6">{profiles.find(p => p.name === result)?.description}</p>
                <button className="btn-primary w-full">
                  Get Your Custom Plan
                </button>
                <button
                  onClick={resetQuiz}
                  className="mt-4 text-gray-500 hover:text-white"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

// Transformation Preview Component
function TransformationPreview() {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(80);
  const [goal, setGoal] = useState('lose');
  const [showResult, setShowResult] = useState(false);

  const calculateProgress = () => {
    if (goal === 'lose') return Math.min(100, ((80 - weight) / 20) * 100 + 20);
    if (goal === 'gain') return Math.min(100, ((weight - 80) / 15) * 100 + 20);
    return 50;
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-green text-sm tracking-[0.3em] uppercase">Transformation</span>
          <h2 className="heading-md mt-2">Preview Your Journey</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Height (cm)</label>
              <input
                type="range"
                min="140"
                max="210"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-neon-red"
              />
              <span className="text-2xl font-heading">{height} cm</span>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Current Weight (kg)</label>
              <input
                type="range"
                min="40"
                max="150"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-neon-red"
              />
              <span className="text-2xl font-heading">{weight} kg</span>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Your Goal</label>
              <div className="flex gap-4">
                {['lose', 'gain', 'tone'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={`flex-1 py-3 rounded-lg border transition-all ${
                      goal === g 
                        ? 'border-neon-red bg-neon-red/20 text-neon-red' 
                        : 'border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowResult(true)}
              className="btn-primary w-full"
            >
              Generate Preview
            </button>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary to-secondary rounded-2xl border border-white/10 p-8 flex items-center justify-center">
              {showResult ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">💪</div>
                  <h3 className="text-2xl font-heading mb-2">12-Week Projection</h3>
                  <p className="text-gray-400 mb-4">
                    {goal === 'lose' ? `Target: ${weight - 8}kg` : goal === 'gain' ? `Target: ${weight + 6}kg` : `Lean & Toned`}
                  </p>
                  <div className="w-full bg-primary rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-neon-red to-neon-green transition-all duration-1000"
                      style={{ width: `${calculateProgress()}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{Math.round(calculateProgress())}% to goal</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Enter your details to see your transformation timeline</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI Coach Chat Component
function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: "Hey! I'm your AI Fitness Coach. Ask me anything about workouts, nutrition, or fitness!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    "Best workout for beginners?",
    "How to lose belly fat?",
    "Protein intake calculator",
    "Pre-workout meal ideas"
  ];

  const responses: Record<string, string> = {
    "best workout for beginners?": "For beginners, I recommend starting with full-body workouts 3x per week. Focus on compound movements like squats, push-ups, and rows. Start light and focus on form!",
    "how to lose belly fat?": "Spot reduction isn't possible, but you can lose belly fat through: 1) Calorie deficit, 2) High-protein diet, 3) Regular cardio + strength training, 4) Adequate sleep, 5) Stress management.",
    "protein intake calculator": "General guideline: 1.6-2.2g protein per kg of body weight. For a 70kg person, that's 112-154g daily. Spread across 4-5 meals for optimal absorption!",
    "pre-workout meal ideas": "Best pre-workout meals (1-2 hours before): Oatmeal with banana, Greek yogurt with berries, Brown rice with chicken, Whole grain toast with peanut butter."
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = responses[input.toLowerCase()] || 
        "That's a great question! For personalized advice, I'd recommend taking our Fitness Quiz to get a tailored program. Would you like to try it?";
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-32 z-50 bg-neon-green/20 border border-neon-green p-4 rounded-full hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] transition-all"
      >
        <MessageSquare className="w-6 h-6 text-neon-green" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-96">
          <div className="bg-secondary border border-white/10 rounded-2xl overflow-hidden">
            <div className="bg-primary p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-neon-green" />
                <span className="font-bold">AI Coach</span>
              </div>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`${msg.role === 'user' ? 'ml-auto' : ''}`}>
                  <div className={`p-3 rounded-lg max-w-[80%] ${
                    msg.role === 'user' 
                      ? 'bg-neon-red/20 text-white' 
                      : 'bg-primary text-gray-300'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-500 text-sm">Typing...</div>
              )}
            </div>

            <div className="p-3 border-t border-white/10">
              <div className="flex gap-2 mb-3 flex-wrap">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(q); }}
                    className="text-xs px-2 py-1 rounded-full bg-primary border border-white/10 text-gray-400 hover:text-white"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-neon-green outline-none"
                />
                <button
                  onClick={handleSend}
                  className="bg-neon-green text-primary p-2 rounded-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Gamified Dashboard Component
function GamifiedDashboard() {
  const [userLevel, setUserLevel] = useState(3);
  const [points, setPoints] = useState(2450);
  const [streak, setStreak] = useState(7);
  
  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Pro', 'Beast Mode'];
  const currentLevel = levels[userLevel] || 'Beginner';
  const nextLevel = levels[userLevel + 1] || 'Max Level';
  const progressToNext = (points % 1000) / 10;

  const achievements = [
    { icon: Flame, name: '7 Day Streak', earned: true },
    { icon: Target, name: 'First Workout', earned: true },
    { icon: Trophy, name: '10K Points', earned: true },
    { icon: Award, name: 'Consistency King', earned: false },
    { icon: Star, name: 'Transformation', earned: false },
    { icon: Zap, name: 'Speed Demon', earned: false },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-red text-sm tracking-[0.3em] uppercase">Gamification</span>
          <h2 className="heading-md mt-2">Your Fitness Journey</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Level Card */}
          <div className="card-dark p-8 rounded-2xl">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-red to-neon-green flex items-center justify-center">
                <span className="text-4xl">🔥</span>
              </div>
              <h3 className="text-2xl font-heading text-neon-red">{currentLevel}</h3>
              <p className="text-gray-400">Level {userLevel + 1}</p>
              
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>{points} XP</span>
                  <span>{userLevel + 1 < 5 ? (userLevel + 2) * 1000 : 'MAX'} XP</span>
                </div>
                <div className="w-full bg-primary rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-red to-neon-green"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">{1000 - (points % 1000)} XP to {nextLevel}</p>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="card-dark p-8 rounded-2xl">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="text-2xl font-heading text-orange-500">{streak} Days</h3>
              <p className="text-gray-400">Current Streak</p>
              
              <div className="mt-6 flex justify-center gap-2">
                {[...Array(7)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      i < streak 
                        ? 'bg-neon-red' 
                        : 'bg-primary'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">Keep it going!</p>
            </div>
          </div>

          {/* Achievements Card */}
          <div className="card-dark p-8 rounded-2xl">
            <div className="text-center">
              <h3 className="text-xl font-heading mb-4">Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg text-center ${
                      achievement.earned 
                        ? 'bg-neon-green/20 border border-neon-green/30' 
                        : 'bg-primary border border-white/10 opacity-50'
                    }`}
                  >
                    <achievement.icon className={`w-6 h-6 mx-auto mb-1 ${
                      achievement.earned ? 'text-neon-green' : 'text-gray-500'
                    }`} />
                    <span className="text-xs">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Gym Tour Component
function GymTour() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const areas = [
    { id: 'weights', name: 'Free Weights', icon: Dumbbell, description: 'Complete dumbbell and barbell sets', color: 'neon-red' },
    { id: 'cardio', name: 'Cardio Zone', icon: Activity, description: 'Treadmills, bikes, rowers', color: 'neon-green' },
    { id: 'functional', name: 'Functional Training', icon: Target, description: 'TRX, battle ropes, kettlebells', color: 'neon-blue' },
    { id: 'boxing', name: 'Boxing Area', icon: Flame, description: 'Heavy bags, speed bags, ring', color: 'neon-red' },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-green text-sm tracking-[0.3em] uppercase">Virtual Tour</span>
          <h2 className="heading-md mt-2">Explore Our Facility</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area) => (
            <motion.div
              key={area.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedArea(area.id)}
              className={`card-dark p-6 rounded-2xl cursor-pointer ${
                selectedArea === area.id ? `border-${area.color}` : ''
              }`}
            >
              <div className={`w-16 h-16 rounded-xl bg-${area.color}/20 flex items-center justify-center mb-4`}>
                <area.icon className={`w-8 h-8 text-${area.color}`} />
              </div>
              <h3 className="text-xl font-heading mb-2">{area.name}</h3>
              <p className="text-gray-400 text-sm">{area.description}</p>
              
              {selectedArea === area.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <button className="btn-ghost w-full text-sm">
                    View Equipment
                  </button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Trainers Section
function TrainersSection() {
  const trainers = [
    {
      name: 'Marcus Chen',
      role: 'Head Strength Coach',
      specialty: 'Powerlifting & Hypertrophy',
      image: '💪',
      certifications: ['NSCA-CSCS', 'USAW L1'],
      stats: { clients: 500, transformations: 200 }
    },
    {
      name: 'Sarah Williams',
      role: 'HIIT Specialist',
      specialty: 'High-Intensity Training',
      image: '🏃‍♀️',
      certifications: ['ACE-CPT', 'CrossFit L2'],
      stats: { clients: 400, transformations: 180 }
    },
    {
      name: 'Jake Rodriguez',
      role: 'Boxing Coach',
      specialty: 'Combat Sports',
      image: '🥊',
      certifications: ['USA Boxing', 'CPT'],
      stats: { clients: 300, transformations: 150 }
    },
    {
      name: 'Emily Thompson',
      role: 'Nutrition Coach',
      specialty: 'Sports Nutrition',
      image: '🥗',
      certifications: ['ISSN-SNS', 'Precision Nutrition'],
      stats: { clients: 600, transformations: 250 }
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-red text-sm tracking-[0.3em] uppercase">Team</span>
          <h2 className="heading-md mt-2">Meet Our Trainers</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-dark p-6 rounded-2xl text-center"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-neon-red/30 to-neon-green/30 flex items-center justify-center text-5xl">
                {trainer.image}
              </div>
              <h3 className="text-xl font-heading">{trainer.name}</h3>
              <p className="text-neon-red text-sm">{trainer.role}</p>
              <p className="text-gray-400 text-sm mt-2">{trainer.specialty}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {trainer.certifications.map((cert, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-primary rounded-full text-gray-500">
                    {cert}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex justify-center gap-6">
                <div>
                  <div className="text-neon-green font-bold">{trainer.stats.clients}+</div>
                  <div className="text-xs text-gray-500">Clients</div>
                </div>
                <div>
                  <div className="text-neon-red font-bold">{trainer.stats.transformations}+</div>
                  <div className="text-xs text-gray-500">Transformations</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Transformation Stories
function TransformationStories() {
  const [activeSlide, setActiveSlide] = useState(0);

  const stories = [
    {
      name: 'John D.',
      before: 250,
      after: 185,
      duration: '8 months',
      quote: "This program changed my life. I never thought I could transform this much.",
      image: '💪'
    },
    {
      name: 'Maria S.',
      before: 180,
      after: 145,
      duration: '6 months',
      quote: "The trainers here are incredible. They pushed me beyond my limits.",
      image: '🏃‍♀️'
    },
    {
      name: 'Mike R.',
      before: 160,
      after: 195,
      duration: '10 months',
      quote: "Gained 35lbs of muscle. The AI coach helped me optimize my nutrition.",
      image: '🏋️'
    }
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-green text-sm tracking-[0.3em] uppercase">Success Stories</span>
          <h2 className="heading-md mt-2">Transformations</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="card-dark p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">{stories[activeSlide].image}</div>
                  <h3 className="text-2xl font-heading">{stories[activeSlide].name}</h3>
                  <p className="text-gray-400">{stories[activeSlide].duration}</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-heading text-gray-500">{stories[activeSlide].before}</div>
                      <div className="text-sm text-gray-500">Before (lbs)</div>
                    </div>
                    <ArrowRight className="w-8 h-8 text-neon-red" />
                    <div className="text-center">
                      <div className="text-4xl font-heading text-neon-green">{stories[activeSlide].after}</div>
                      <div className="text-sm text-neon-green">After (lbs)</div>
                    </div>
                  </div>
                  <p className="text-lg italic text-gray-300">"{stories[activeSlide].quote}"</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeSlide === index 
                      ? 'bg-neon-red w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Membership Pricing
function MembershipPricing() {
  const [duration, setDuration] = useState(12);
  const [goal, setGoal] = useState('lose');

  const plans = [
    {
      name: 'Basic',
      price: 49,
      features: ['Gym access', 'Basic equipment', 'Locker room'],
      popular: false
    },
    {
      name: 'Pro',
      price: 89,
      features: ['All Basic features', 'Group classes', 'Sauna & steam', 'Guest passes'],
      popular: true
    },
    {
      name: 'Elite',
      price: 149,
      features: ['All Pro features', 'Personal training', 'Nutrition plan', 'Recovery zone'],
      popular: false
    }
  ];

  const calculatePrice = (basePrice: number) => {
    let discount = 0;
    if (duration >= 12) discount = 0.2;
    else if (duration >= 6) discount = 0.1;
    
    let goalMultiplier = 1;
    if (goal === 'lose') goalMultiplier = 1.1;
    else if (goal === 'gain') goalMultiplier = 1.15;

    return Math.round(basePrice * (1 - discount) * goalMultiplier);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-red text-sm tracking-[0.3em] uppercase">Membership</span>
          <h2 className="heading-md mt-2">Choose Your Plan</h2>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="card-dark p-6 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Commitment</label>
                <div className="flex gap-2">
                  {[6, 12, 24].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-2 rounded-lg text-sm transition-all ${
                        duration === d 
                          ? 'bg-neon-red text-white' 
                          : 'bg-primary text-gray-400 hover:text-white'
                      }`}
                    >
                      {d} mo {d >= 12 && '(-20%)'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Goal</label>
                <div className="flex gap-2">
                  {['lose', 'gain', 'tone'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`flex-1 py-2 rounded-lg text-sm capitalize transition-all ${
                        goal === g 
                          ? 'bg-neon-green text-primary' 
                          : 'bg-primary text-gray-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card-dark p-8 rounded-2xl relative ${
                plan.popular ? 'border-neon-red' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neon-red text-white text-xs px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-heading">{plan.name}</h3>
              <div className="my-4">
                <span className="text-4xl font-heading">${calculatePrice(plan.price)}</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400">
                    <Zap className="w-4 h-4 text-neon-green" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={plan.popular ? 'btn-primary w-full' : 'btn-ghost w-full'}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Class Booking
function ClassBooking() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const classes = [
    { name: 'Morning HIIT', time: '6:00 AM', trainer: 'Sarah W.', spots: 3, type: 'hiit' },
    { name: 'Power Lifting', time: '7:30 AM', trainer: 'Marcus C.', spots: 5, type: 'strength' },
    { name: 'Boxing Fundamentals', time: '12:00 PM', trainer: 'Jake R.', spots: 2, type: 'boxing' },
    { name: 'Evening Yoga', time: '6:00 PM', trainer: 'Emily T.', spots: 8, type: 'yoga' },
    { name: 'CrossFit', time: '7:30 PM', trainer: 'Sarah W.', spots: 1, type: 'crossfit' },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-green text-sm tracking-[0.3em] uppercase">Book Classes</span>
          <h2 className="heading-md mt-2">Class Schedule</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-2 mb-8">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`w-12 h-12 rounded-lg text-sm font-medium transition-all ${
                  selectedDay === index 
                    ? 'bg-neon-red text-white' 
                    : 'bg-primary text-gray-400 hover:text-white'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {classes.map((cls, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedClass(cls.name)}
                className={`card-dark p-4 rounded-xl flex items-center justify-between cursor-pointer ${
                  selectedClass === cls.name ? 'border-neon-green' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 text-center">
                    <div className="text-lg font-heading">{cls.time}</div>
                  </div>
                  <div>
                    <h4 className="font-bold">{cls.name}</h4>
                    <p className="text-sm text-gray-400">{cls.trainer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${cls.spots <= 3 ? 'text-neon-red' : 'text-neon-green'}`}>
                    {cls.spots === 1 ? '⚠️ Last spot!' : `Only ${cls.spots} spots left`}
                  </div>
                  <button className="btn-ghost text-sm py-2 px-4 mt-2">
                    Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Workout Generator
function WorkoutGenerator() {
  const [goal, setGoal] = useState('strength');
  const [generated, setGenerated] = useState(false);
  const [workout, setWorkout] = useState<any>(null);

  const generateWorkout = () => {
    const workouts: Record<string, any> = {
      strength: {
        name: 'Power Building',
        days: [
          { day: 'Push', exercises: ['Bench Press 4x8', 'Overhead Press 3x10', 'Incline DB Press 3x12', 'Tricep Dips 3x15', 'Lateral Raises 4x15'] },
          { day: 'Pull', exercises: ['Deadlift 4x5', 'Barbell Rows 3x10', 'Face Pulls 4x15', 'Bicep Curls 4x12', 'Hammer Curls 3x12'] },
          { day: 'Legs', exercises: ['Squats 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Leg Curls 4x12', 'Calf Raises 4x20'] },
        ]
      },
      cardio: {
        name: 'Fat Burn Blitz',
        days: [
          { day: 'HIIT', exercises: ['30s sprint / 30s rest x10', 'Burpees 3x20', 'Mountain Climbers 4x30', 'Jump Rope 5min', 'Battle Ropes 4x45s'] },
          { day: 'Steady', exercises: ['45min jog', 'Cycle 30min', 'Rowing 30min', 'Stair Climber 20min', 'Core circuit 3x'] },
          { day: 'Active', exercises: ['Box jumps 4x15', 'Kettlebell swings 4x30', 'Walking lunges 3x20', 'Plank variations 4x60s', 'HIIT intervals 20min'] },
        ]
      },
      flexibility: {
        name: 'Mobility Flow',
        days: [
          { day: 'Flow', exercises: ['Dynamic stretching 10min', 'Yoga flow 30min', 'Foam rolling 15min', 'Mobility drills 20min', 'Deep breathing 5min'] },
          { day: 'Restore', exercises: ['Full body stretch 30min', 'Yoga poses 25min', 'Self massage 15min', 'Joint circles 10min', 'Meditation 10min'] },
          { day: 'Active', exercises: ['Cat-cow 3x20', 'Hip openers 4x10', 'Shoulder dislocates 3x15', 'Pigeon pose 2x60s', 'Child pose 3x60s'] },
        ]
      }
    };

    setWorkout(workouts[goal]);
    setGenerated(true);
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-red text-sm tracking-[0.3em] uppercase">Generator</span>
          <h2 className="heading-md mt-2">Create Your Workout</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-dark p-8 rounded-2xl">
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-3">Select Your Goal</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'strength', icon: Dumbbell, label: 'Strength' },
                  { id: 'cardio', icon: Flame, label: 'Cardio' },
                  { id: 'flexibility', icon: Activity, label: 'Flexibility' }
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => { setGoal(g.id); setGenerated(false); }}
                    className={`p-4 rounded-xl border transition-all ${
                      goal === g.id 
                        ? 'border-neon-red bg-neon-red/20' 
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <g.icon className={`w-8 h-8 mx-auto mb-2 ${goal === g.id ? 'text-neon-red' : 'text-gray-500'}`} />
                    <span className={goal === g.id ? 'text-white' : 'text-gray-400'}>{g.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={generateWorkout} className="btn-primary w-full">
              Generate Weekly Plan
            </button>

            {generated && workout && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-8"
              >
                <h3 className="text-xl font-heading text-neon-green mb-4">{workout.name}</h3>
                <div className="space-y-4">
                  {workout.days.map((day: any, index: number) => (
                    <div key={index} className="bg-primary p-4 rounded-xl">
                      <h4 className="font-bold text-neon-red mb-2">{day.day}</h4>
                      <ul className="space-y-2">
                        {day.exercises.map((ex: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-gray-400">
                            <ArrowRight className="w-4 h-4 text-neon-green" />
                            {ex}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials
function Testimonials() {
  const testimonials = [
    { name: 'Alex K.', role: 'Member since 2023', text: 'Best gym I\'ve ever been to. The equipment is top-notch and the community is amazing.', rating: 5 },
    { name: 'Jennifer L.', role: 'Pro Member', text: 'The AI coach feature is game-changing. It\'s like having a personal trainer in your pocket.', rating: 5 },
    { name: 'David M.', role: 'Athlete Member', text: 'Transformed my performance in just 3 months. The trainers really know their stuff.', rating: 5 },
  ];

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-green text-sm tracking-[0.3em] uppercase">Testimonials</span>
          <h2 className="heading-md mt-2">What Members Say</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card-dark p-6 rounded-2xl">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-red to-neon-green flex items-center justify-center">
                  {testimonial.name[0]}
                </div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: 'What are your gym hours?', a: 'We are open 24/7 for members. Staffed hours are 6AM-10PM daily.' },
    { q: 'Is there a joining fee?', a: 'No joining fee! We only charge the monthly membership rate.' },
    { q: 'Can I try a free session?', a: 'Yes! All new members get a free consultation and training session.' },
    { q: 'Do you offer nutrition coaching?', a: 'Yes, our Elite plan includes nutrition coaching. It\'s also available as an add-on.' },
    { q: 'What\'s the cancellation policy?', a: 'You can cancel anytime with 30 days notice. No long-term contracts required.' },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="text-neon-red text-sm tracking-[0.3em] uppercase">FAQ</span>
          <h2 className="heading-md mt-2">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-dark rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <span className="font-bold">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-4 pb-4 text-gray-400"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <>
      <HeroSection />
      <TransformationPreview />
      <GamifiedDashboard />
      <GymTour />
      <TrainersSection />
      <TransformationStories />
      <MembershipPricing />
      <ClassBooking />
      <WorkoutGenerator />
      <Testimonials />
      <FAQ />
      <FitnessQuiz />
      <AIChat />
    </>
  );
}