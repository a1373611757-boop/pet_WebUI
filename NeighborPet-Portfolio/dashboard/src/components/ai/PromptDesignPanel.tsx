import { useState } from 'react';
import type { AiFeatureKey } from '../../ai/aiTypes';
import { promptDesigns } from '../../ai/prompts';

interface PromptDesignPanelProps {
  feature: AiFeatureKey;
}

export function PromptDesignPanel({ feature }: PromptDesignPanelProps) {
  const [open, setOpen] = useState(false);
  const prompt = promptDesigns[feature];

  return (
    <div className="prompt-design">
      <button className="ai-secondary-button" type="button" onClick={() => setOpen((current) => !current)}>
        {open ? '收起 Prompt 设计' : '查看 Prompt 设计'}
      </button>

      {open && (
        <article className="prompt-design__body">
          <div>
            <span>角色设定</span>
            <p>{prompt.role}</p>
          </div>
          <div>
            <span>输入变量</span>
            <ul>
              {prompt.inputs.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span>输出格式</span>
            <ul>
              {prompt.outputFormat.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span>禁止事项</span>
            <ul>
              {prompt.forbidden.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <span>人工审核规则</span>
            <p>{prompt.humanReview}</p>
          </div>
        </article>
      )}
    </div>
  );
}
