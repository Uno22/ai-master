import assert from 'node:assert/strict';
import test from 'node:test';
import { AiGateway, MockAiAdapter } from '../src/ai/gateway.ts';

test('routing returns correct mock provider', async () => {
  const gateway = new AiGateway([new MockAiAdapter('openai'), new MockAiAdapter('gemini')]);
  const output = await gateway.generate('gemini', 'Hello developer');
  assert.equal(output.provider, 'gemini');
  assert.equal(output.model, 'mock-offline-v1');
  assert.match(output.text, /Hello developer/);
});

test('rejects unknown provider and empty prompt', async () => {
  const gateway = new AiGateway([new MockAiAdapter('openai')]);
  await assert.rejects(gateway.generate('anthropic', 'Hello'), /not configured/);
  await assert.rejects(gateway.generate('openai', ''), /non-empty/);
});

test('rejects duplicate provider registration', () => {
  assert.throws(() => new AiGateway([new MockAiAdapter('openai'), new MockAiAdapter('openai')]), /Duplicate/);
});
