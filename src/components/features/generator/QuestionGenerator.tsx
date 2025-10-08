import { useState } from "react";
import { QuestionSection, TextArea, AnswerBox, StyledButton } from "./QuestionGenerator.styled";

const QuestionGenerator: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleAskQuestion = async () => {
        if (!question.trim()) {
            setError('Vul eerst een vraag in');
            return;
        }

        setLoading(true);
        setError('');
        setAnswer('');

        try {
            const response = await fetch('/api/tuincoach', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Er ging iets fout');
            }

            setAnswer(data.answer);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Er ging iets fout. Probeer het opnieuw.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <QuestionSection>
            <div>
                <h4>Stel je vraag 💬</h4>
                <p>Heb je een vraag over moestuinen of groenten? Stel ze hier en krijg direct advies.</p>
            </div>
            <TextArea
                placeholder="Bijvoorbeeld: Wanneer moet ik tomaten planten?"
                rows={3}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />
            <StyledButton
                className="btn btn--cta"
                onClick={handleAskQuestion}
                disabled={loading}
            >
                {loading ? 'Aan het denken... 🌱' : 'Stel vraag'}
            </StyledButton>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {answer && (
                <AnswerBox>
                    <h5>Antwoord:</h5>
                    <p>{answer}</p>
                </AnswerBox>
            )}
        </QuestionSection>
    );
};

export default QuestionGenerator;