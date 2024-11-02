import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGING_FACE_TOKEN);

export function useHuggingFace() {
  const textGeneration = async (prompt: string) => {
    try {
      const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
        },
      });
      return response.generated_text;
    } catch (error) {
      console.error('Text generation error:', error);
      throw error;
    }
  };

  const sentimentAnalysis = async (text: string) => {
    try {
      const response = await hf.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: text,
      });
      return response;
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      throw error;
    }
  };

  const imageClassification = async (imageUrl: string) => {
    try {
      const response = await hf.imageClassification({
        model: 'google/vit-base-patch16-224',
        data: await (await fetch(imageUrl)).blob(),
      });
      return response;
    } catch (error) {
      console.error('Image classification error:', error);
      throw error;
    }
  };

  const textToSpeech = async (text: string) => {
    try {
      const response = await hf.textToSpeech({
        model: 'espnet/kan-bayashi_ljspeech_vits',
        inputs: text,
      });
      return URL.createObjectURL(response);
    } catch (error) {
      console.error('Text to speech error:', error);
      throw error;
    }
  };

  const imageToImage = async (imageUrl: string) => {
    try {
      const response = await hf.imageToImage({
        model: 'timbrooks/instruct-pix2pix',
        inputs: {
          image: await (await fetch(imageUrl)).blob(),
          prompt: 'Convert this image to an artistic oil painting',
        },
      });
      return URL.createObjectURL(response);
    } catch (error) {
      console.error('Image to image error:', error);
      throw error;
    }
  };

  const codeGeneration = async (prompt: string) => {
    try {
      const response = await hf.textGeneration({
        model: 'Salesforce/codegen-350M-mono',
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.5,
        },
      });
      return response.generated_text;
    } catch (error) {
      console.error('Code generation error:', error);
      throw error;
    }
  };

  const translation = async (text: string) => {
    try {
      const response = await hf.translation({
        model: 'Helsinki-NLP/opus-mt-en-fr',
        inputs: text,
      });
      return response.translation_text;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  };

  const imageCaption = async (imageUrl: string) => {
    try {
      const response = await hf.imageToText({
        model: 'Salesforce/blip-image-captioning-base',
        data: await (await fetch(imageUrl)).blob(),
      });
      return response.generated_text;
    } catch (error) {
      console.error('Image caption error:', error);
      throw error;
    }
  };

  const textSummarization = async (text: string) => {
    try {
      const response = await hf.summarization({
        model: 'facebook/bart-large-cnn',
        inputs: text,
        parameters: {
          max_length: 130,
          min_length: 30,
        },
      });
      return response.summary_text;
    } catch (error) {
      console.error('Text summarization error:', error);
      throw error;
    }
  };

  const sketchToImage = async (imageUrl: string) => {
    try {
      const response = await hf.imageToImage({
        model: 'timbrooks/instruct-pix2pix',
        inputs: {
          image: await (await fetch(imageUrl)).blob(),
          prompt: 'Convert this sketch to a detailed, realistic image',
        },
      });
      return URL.createObjectURL(response);
    } catch (error) {
      console.error('Sketch to image error:', error);
      throw error;
    }
  };

  const poemGeneration = async (prompt: string) => {
    try {
      const response = await hf.textGeneration({
        model: 'gpt2',
        inputs: `Write a poem about ${prompt}:\n\n`,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.8,
        },
      });
      return response.generated_text;
    } catch (error) {
      console.error('Poem generation error:', error);
      throw error;
    }
  };

  const imageEnhancement = async (imageUrl: string) => {
    try {
      const response = await hf.imageToImage({
        model: 'timbrooks/instruct-pix2pix',
        inputs: {
          image: await (await fetch(imageUrl)).blob(),
          prompt: 'Enhance this image, make it higher quality and sharper',
        },
      });
      return URL.createObjectURL(response);
    } catch (error) {
      console.error('Image enhancement error:', error);
      throw error;
    }
  };

  return {
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
  };
}