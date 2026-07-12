import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
  QUIZ_COMPLETE_IMAGE,
  QUIZ_INTRO_IMAGE,
  QUIZ_OVER_IMAGE,
} from '../../assets/trailImages';
import {AnimatedScreen} from '../../components/AnimatedScreen';
import {QUIZ_LEVELS} from '../../data/quiz';
import {Colors} from '../../theme/colors';

const PASS_RATIO = 0.7;
const GRADIENT_COLORS = ['#930000', '#EA0201', '#FA3502', '#FB8300', '#FDC301'];

type QuizStage = 'intro' | 'question' | 'complete' | 'failed';

export function QuizScreen() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [stage, setStage] = useState<QuizStage>('intro');

  const level = QUIZ_LEVELS[levelIndex];
  const question = level.questions[questionIndex];

  const startQuiz = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedIndex(null);
    setStage('question');
  };

  const exitToIntro = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedIndex(null);
    setStage('intro');
  };

  const nextLevel = () => {
    setLevelIndex(prev => (prev + 1) % QUIZ_LEVELS.length);
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedIndex(null);
    setStage('intro');
  };

  const selectAnswer = (index: number) => {
    if (selectedIndex !== null) {
      return;
    }
    setSelectedIndex(index);
    const updatedCorrect =
      correctCount + (index === question.correctIndex ? 1 : 0);
    setCorrectCount(updatedCorrect);

    setTimeout(() => {
      const isLastQuestion = questionIndex + 1 >= level.questions.length;
      if (!isLastQuestion) {
        setQuestionIndex(prev => prev + 1);
        setSelectedIndex(null);
        return;
      }
      const passed = updatedCorrect / level.questions.length >= PASS_RATIO;
      setStage(passed ? 'complete' : 'failed');
    }, 900);
  };

  const handleShare = () => {
    Share.share({
      message:
        stage === 'complete'
          ? `I just completed "${level.title}" in Volcano Quiz! 🌋`
          : `Playing "${level.title}" in Volcano Quiz — trying again!`,
    });
  };

  return (
    <AnimatedScreen style={styles.QuizScreenContainer}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.QuizScreenHeader}>
          <Text style={styles.QuizScreenTitle}>Volcano Quiz</Text>
          {stage === 'question' && (
            <TouchableOpacity
              style={styles.QuizScreenExitPill}
              onPress={exitToIntro}>
              <Text style={styles.QuizScreenExitPillText}>Exit</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.QuizScreenDivider} />

        <AnimatedScreen
          key={`${stage}-${levelIndex}-${questionIndex}`}
          style={styles.QuizScreenBody}
          distance={20}
          duration={360}>
          {stage === 'intro' && (
            <View style={styles.QuizScreenIntro}>
              <Image
                source={QUIZ_INTRO_IMAGE}
                style={styles.QuizScreenIntroImage}
                resizeMode="contain"
              />
              <View style={styles.QuizScreenCard}>
                <Text style={styles.QuizScreenIntroLevelLabel}>
                  Level {levelIndex + 1} · {level.title}
                </Text>
                <Text style={styles.QuizScreenIntroText}>
                  {level.description}
                </Text>
                <TouchableOpacity
                  style={styles.QuizScreenPrimaryBtnWrap}
                  onPress={startQuiz}
                  activeOpacity={0.85}>
                  <LinearGradient
                    colors={GRADIENT_COLORS}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.QuizScreenPrimaryBtn}>
                    <Text style={styles.QuizScreenPrimaryBtnText}>
                      Start Quiz
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {stage === 'question' && (
            <View style={styles.QuizScreenQuestion}>
              <Text style={styles.QuizScreenQuestionText}>
                {questionIndex + 1}. {question.text}
              </Text>
              <View style={styles.QuizScreenOptions}>
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correctIndex;
                  const isSelected = index === selectedIndex;
                  const answered = selectedIndex !== null;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.QuizScreenOption,
                        answered && isCorrect && styles.QuizScreenOptionCorrect,
                        answered &&
                          isSelected &&
                          !isCorrect &&
                          styles.QuizScreenOptionWrong,
                      ]}
                      disabled={answered}
                      activeOpacity={0.85}
                      onPress={() => selectAnswer(index)}>
                      <Text
                        style={[
                          styles.QuizScreenOptionText,
                          answered &&
                            !isCorrect &&
                            styles.QuizScreenOptionTextDim,
                        ]}>
                        {String.fromCharCode(65 + index)}. {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Image
                source={QUIZ_INTRO_IMAGE}
                style={styles.QuizScreenQuestionImage}
                resizeMode="contain"
              />
            </View>
          )}

          {(stage === 'complete' || stage === 'failed') && (
            <View style={styles.QuizScreenResult}>
              <Image
                source={
                  stage === 'complete' ? QUIZ_COMPLETE_IMAGE : QUIZ_OVER_IMAGE
                }
                style={styles.QuizScreenResultImage}
                resizeMode="contain"
              />
              <View style={styles.QuizScreenCard}>
                <Text style={styles.QuizScreenResultTitle}>
                  {stage === 'complete'
                    ? 'Level Complete'
                    : 'Try the Trail Again'}
                </Text>
                <Text style={styles.QuizScreenResultSubtitle}>
                  {stage === 'complete'
                    ? 'You reached the summit of this quiz level.'
                    : 'This route was tougher than expected.'}
                </Text>

                <TouchableOpacity
                  style={styles.QuizScreenResultBtn}
                  activeOpacity={0.85}
                  onPress={stage === 'complete' ? nextLevel : startQuiz}>
                  <Text style={styles.QuizScreenResultBtnText}>
                    {stage === 'complete' ? 'Next Level' : 'Try Again'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.QuizScreenResultBtn}
                  activeOpacity={0.85}
                  onPress={handleShare}>
                  <Text style={styles.QuizScreenResultBtnText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.QuizScreenResultBtn}
                  activeOpacity={0.85}
                  onPress={exitToIntro}>
                  <Text style={styles.QuizScreenResultBtnText}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </AnimatedScreen>
      </ScrollView>
    </AnimatedScreen>
  );
}

const styles = StyleSheet.create({
  QuizScreenContainer: {flex: 1, backgroundColor: Colors.appBg},
  QuizScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  QuizScreenTitle: {
    color: Colors.textPrimary,
    fontSize: 24,
    fontWeight: '500',
  },
  QuizScreenExitPill: {
    backgroundColor: '#310406',
    borderRadius: 12,
    height: 27,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QuizScreenExitPillText: {
    color: Colors.textPrimary,
    fontSize: 12,
    letterSpacing: -0.32,
  },
  QuizScreenDivider: {
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 16,
  },
  QuizScreenBody: {
    flex: 1,
    paddingHorizontal: 20,
  },

  QuizScreenCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },

  QuizScreenIntro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QuizScreenIntroImage: {
    width: 280,
    height: 248,
    marginBottom: 28,
  },
  QuizScreenIntroLevelLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  QuizScreenIntroText: {
    color: '#d2d2d2',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'center',
    letterSpacing: -0.32,
    marginBottom: 20,
  },

  QuizScreenPrimaryBtnWrap: {
    alignSelf: 'stretch',
  },
  QuizScreenPrimaryBtn: {
    height: 47,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  QuizScreenPrimaryBtnText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },

  QuizScreenQuestion: {
    flex: 1,
  },
  QuizScreenQuestionText: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 28,
    marginBottom: 24,
  },
  QuizScreenOptions: {
    gap: 14,
  },
  QuizScreenOption: {
    height: 47,
    borderRadius: 16,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  QuizScreenOptionCorrect: {
    backgroundColor: '#004c11',
  },
  QuizScreenOptionWrong: {
    backgroundColor: '#930000',
  },
  QuizScreenOptionText: {
    color: Colors.textPrimary,
    fontSize: 14,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
  QuizScreenOptionTextDim: {
    color: '#bababa',
  },
  QuizScreenQuestionImage: {
    width: 150,
    height: 132,
    alignSelf: 'center',
    marginTop: 24,
  },

  QuizScreenResult: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
    paddingBottom: 20,
  },
  QuizScreenResultImage: {
    marginBottom: 20,
  },
  QuizScreenResultTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 6,
  },
  QuizScreenResultSubtitle: {
    color: '#999999',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  QuizScreenResultBtn: {
    alignSelf: 'stretch',
    height: 43,
    borderRadius: 16,
    backgroundColor: Colors.tabBarBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5.9,
    elevation: 4,
  },
  QuizScreenResultBtnText: {
    color: Colors.textPrimary,
    fontSize: 14,
    letterSpacing: -0.32,
  },
});
