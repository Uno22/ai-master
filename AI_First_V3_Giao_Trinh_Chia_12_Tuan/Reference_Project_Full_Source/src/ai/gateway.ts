export type ProviderName = 'openai' | 'anthropic' | 'gemini';
export type AiResult = {
  provider: ProviderName;
  model: string;
  text: string;
  usage: { inputTokens: number; outputTokens: number };
};

export interface AiAdapter {
  readonly name: ProviderName;
  generate(prompt: string): Promise<AiResult>;
}

export class AiGateway {
  private readonly adapters: readonly AiAdapter[];
  constructor(adapters: readonly AiAdapter[]) {
    this.adapters = adapters;
    if (new Set(adapters.map((a) => a.name)).size !== adapters.length) {
      throw new Error('Duplicate provider registration');
    }
  }

  async generate(provider: ProviderName, prompt: string): Promise<AiResult> {
    if (typeof prompt !== 'string' || !prompt.trim() || prompt.length > 4000) {
      throw new Error('Prompt must be non-empty and <= 4000 characters');
    }
    const adapter = this.adapters.find((a) => a.name === provider);
    if (!adapter) throw new Error(`Provider not configured: ${provider}`);
    return adapter.generate(prompt);
  }
}

export class MockAiAdapter implements AiAdapter {
  readonly name: ProviderName;
  constructor(name: ProviderName) { this.name = name; }

  async generate(prompt: string): Promise<AiResult> {
    return {
      provider: this.name,
      model: 'mock-offline-v1',
      text: `[${this.name}] ${prompt.trim()}`,
      usage: { inputTokens: prompt.trim().split(/\s+/).length, outputTokens: 1 },
    };
  }
}
