import { useMemo, useState } from 'react';
import { AI_OUTPUT_NOTICE, type CustomerServiceInput } from '../../ai/aiTypes';
import { generateCustomerServiceReply } from '../../ai/mockAiEngine';
import { customerQuestions } from '../../ai/knowledgeBase';
import { PromptDesignPanel } from './PromptDesignPanel';

export function AiCustomerServiceDemo() {
  const [question, setQuestion] = useState(customerQuestions[0]);
  const [customQuestion, setCustomQuestion] = useState('');
  const [serviceType, setServiceType] = useState<CustomerServiceInput['serviceType']>('猫咪寄养');
  const [petProfile, setPetProfile] = useState('2 岁英短，性格胆小，近期食欲正常');
  const [submittedInput, setSubmittedInput] = useState<CustomerServiceInput>({
    question: customerQuestions[0],
    serviceType: '猫咪寄养',
    petProfile: '2 岁英短，性格胆小，近期食欲正常'
  });

  const output = useMemo(() => generateCustomerServiceReply(submittedInput), [submittedInput]);

  const handleGenerate = () => {
    setSubmittedInput({
      question: customQuestion.trim() || question,
      serviceType,
      petProfile
    });
  };

  return (
    <section className="ai-demo-grid" aria-label="AI 客服助手">
      <div className="ai-input-card">
        <div className="panel-header">
          <div>
            <p>AI 客服助手</p>
            <h2>预约前疑问解答</h2>
          </div>
          <span className="mock-badge">本地 mock</span>
        </div>

        <label className="ai-field">
          <span>常见问题</span>
          <select value={question} onChange={(event) => setQuestion(event.target.value)}>
            {customerQuestions.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="ai-field">
          <span>自定义问题</span>
          <textarea
            value={customQuestion}
            onChange={(event) => setCustomQuestion(event.target.value)}
            placeholder="也可以输入自己的咨询问题"
            rows={3}
          />
        </label>

        <div className="ai-form-row">
          <label className="ai-field">
            <span>服务类型</span>
            <select value={serviceType} onChange={(event) => setServiceType(event.target.value as CustomerServiceInput['serviceType'])}>
              <option value="猫咪寄养">猫咪寄养</option>
              <option value="狗狗寄养">狗狗寄养</option>
              <option value="上门喂养">上门喂养</option>
              <option value="节假日预约">节假日预约</option>
            </select>
          </label>

          <label className="ai-field">
            <span>宠物信息</span>
            <input value={petProfile} onChange={(event) => setPetProfile(event.target.value)} />
          </label>
        </div>

        <button className="ai-primary-button" type="button" onClick={handleGenerate}>生成客服回复</button>
        <PromptDesignPanel feature="customerService" />
      </div>

      <article className="ai-result-card">
        <div className="ai-result-card__head">
          <strong>客服回复</strong>
          <span>{AI_OUTPUT_NOTICE}</span>
        </div>
        <dl className="ai-output-list">
          <div>
            <dt>回答内容</dt>
            <dd>{output.answer}</dd>
          </div>
          <div>
            <dt>推荐下一步动作</dt>
            <dd>{output.nextAction}</dd>
          </div>
          <div>
            <dt>是否需要转人工</dt>
            <dd>{output.needHuman ? '需要转人工确认' : '暂不需要，可继续自助预约'}</dd>
          </div>
          <div>
            <dt>风险提示</dt>
            <dd>{output.riskNote}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
