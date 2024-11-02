import React, { useState } from 'react';
import { useThemeStore } from './store/themeStore';
import { ThemeToggle } from './components/ThemeToggle';
import { AITool } from './components/AITool';
import { TextInput } from './components/TextInput';
import { Button } from './components/Button';
import { CategoryFilter } from './components/CategoryFilter';
import { useHuggingFace } from './hooks/useHuggingFace';
import { models } from './data/models';
import type { ModelCategory } from './types/models';

function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ModelCategory>('all');
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { isDark } = useThemeStore();
  
  const { 
    textGeneration,
    sentimentAnalysis,
    imageClassification,
    textToSpeech,
    imageToImage,
    codeGeneration,
    translation,
    imageCaption,
    textSummarization,
    sketchToImage,
    poemGeneration,
    imageEnhancement,
  } = useHuggingFace();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;
      switch (activeTool) {
        case 'text-generation':
          response = await textGeneration(input);
          break;
        case 'sentiment':
          response = await sentimentAnalysis(input);
          break;
        case 'image-classification':
          response = await imageClassification(imageUrl);
          break;
        case 'text-to-speech':
          response = await textToSpeech(input);
          break;
        case 'image-to-art':
          response = await imageToImage(imageUrl);
          break;
        case 'code-generator':
          response = await codeGeneration(input);
          break;
        case 'translation':
          response = await translation(input);
          break;
        case 'image-caption':
          response = await imageCaption(imageUrl);
          break;
        case 'text-summarizer':
          response = await textSummarization(input);
          break;
        case 'sketch-to-image':
          response = await sketchToImage(imageUrl);
          break;
        case 'poem-generator':
          response = await poemGeneration(input);
          break;
        case 'image-enhancement':
          response = await imageEnhancement(imageUrl);
          break;
        default:
          console.log('Model not implemented yet');
      }
      setResult(response);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredModels = models.filter(
    model => selectedCategory === 'all' || model.category === selectedCategory
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <ThemeToggle />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
            isDark ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'
          }`}>
            AI Tools Hub
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Explore the power of AI with our collection of tools powered by Hugging Face models.
          </p>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="max-w-4xl mx-auto space-y-4">
          {filteredModels.map((model) => (
            <AITool
              key={model.id}
              icon={model.icon}
              title={model.title}
              description={model.description}
              isActive={activeTool === model.id}
              onClick={() => {
                setActiveTool(activeTool === model.id ? null : model.id);
                setResult(null);
                setInput('');
                setImageUrl('');
              }}
            >
              <TextInput
                value={model.inputType === 'image' ? imageUrl : input}
                onChange={model.inputType === 'image' ? setImageUrl : setInput}
                placeholder={model.inputPlaceholder}
                label={model.inputLabel}
                rows={3}
              />
              {model.inputType === 'image' && imageUrl && (
                <div className="mb-4">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <Button
                onClick={handleSubmit}
                isLoading={loading}
                disabled={!input && !imageUrl}
              >
                {model.buttonText}
              </Button>
              {result && (
                <div className={`mt-4 p-4 rounded-lg ${
                  isDark ? 'bg-gray-800/50' : 'bg-white/50'
                }`}>
                  {model.id === 'text-to-speech' ? (
                    <audio controls className="w-full">
                      <source src={result} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  ) : model.id === 'image-to-art' || model.id === 'sketch-to-image' || model.id === 'image-enhancement' ? (
                    <img
                      src={result}
                      alt="Generated Result"
                      className="w-full rounded-lg"
                    />
                  ) : model.id === 'sentiment' ? (
                    <>
                      <p className={`text-lg font-semibold ${
                        isDark ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {result[0].label}
                      </p>
                      <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                        Confidence: {Math.round(result[0].score * 100)}%
                      </p>
                    </>
                  ) : model.id === 'code-generator' ? (
                    <pre className={`whitespace-pre-wrap font-mono text-sm ${
                      isDark ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      {result}
                    </pre>
                  ) : (
                    <p className={`whitespace-pre-wrap ${
                      isDark ? 'text-gray-300' : 'text-gray-800'
                    }`}>
                      {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
                    </p>
                  )}
                </div>
              )}
            </AITool>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;