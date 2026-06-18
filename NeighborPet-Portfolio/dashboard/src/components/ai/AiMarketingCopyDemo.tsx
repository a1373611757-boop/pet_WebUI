import { useMemo, useState } from 'react';
import { AI_OUTPUT_NOTICE, type MarketingCopyInput, type MarketingServiceType } from '../../ai/aiTypes';
import { defaultMarketingInput, targetUsers } from '../../ai/aiExamples';
import { generateMarketingCopy } from '../../ai/mockAiEngine';
import { PromptDesignPanel } from './PromptDesignPanel';

const serviceTypes: MarketingServiceType[] = ['猫咪寄养', '狗狗寄养', '上门喂养', '节假日预约提醒'];

export function AiMarketingCopyDemo() {
  const [input, setInput] = useState<MarketingCopyInput>(defaultMarketingInput);
  const [submittedInput, setSubmittedInput] = useState<MarketingCopyInput>(defaultMarketingInput);
  const output = useMemo(() => generateMarketingCopy(submittedInput), [submittedInput]);

  return (
    <section className="ai-demo-grid" aria-label="AI 运营文案生成">
      <div className="ai-input-card">
        <div className="panel-header">
          <div>
            <p>AI 运营文案生成</p>
            <h2>多渠道内容草稿</h2>
          </div>
          <span className="mock-badge">人工发布</span>
        </div>

        <div className="ai-form-row ai-form-row--two">
          <label className="ai-field">
            <span>渠道</span>
            <select value={input.channel} onChange={(event) => setInput({ ...input, channel: event.target.value as MarketingCopyInput['channel'] })}>
              <option value="朋友圈">朋友圈</option>
              <option value="小红书">小红书</option>
              <option value="微信群">微信群</option>
            </select>
          </label>

          <label className="ai-field">
            <span>服务类型</span>
            <select value={input.serviceType} onChange={(event) => setInput({ ...input, serviceType: event.target.value as MarketingServiceType })}>
              {serviceTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="ai-field">
          <span>目标用户</span>
          <select value={input.targetUser} onChange={(event) => setInput({ ...input, targetUser: event.target.value })}>
            {targetUsers.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <button className="ai-primary-button" type="button" onClick={() => setSubmittedInput(input)}>生成运营文案</button>
        <PromptDesignPanel feature="marketingCopy" />
      </div>

      <article className="ai-result-card">
        <div className="ai-result-card__head">
          <strong>文案草稿</strong>
          <span>{AI_OUTPUT_NOTICE}</span>
        </div>
        <dl className="ai-output-list">
          <div>
            <dt>标题</dt>
            <dd>{output.title}</dd>
          </div>
          <div>
            <dt>正文</dt>
            <dd>{output.body}</dd>
          </div>
          <div>
            <dt>行动引导</dt>
            <dd>{output.callToAction}</dd>
          </div>
          <div>
            <dt>适用渠道</dt>
            <dd>{output.channel}</dd>
          </div>
        </dl>
        <p className="ai-risk-note">{output.complianceNote}</p>
      </article>
    </section>
  );
}
