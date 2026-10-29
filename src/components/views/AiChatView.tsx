import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';

export const AiChatView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `안녕하십니까! 세종 유보통합 AI 행정지원 챗봇입니다. 
유치원과 어린이집 통합 행정 기준, 2025 유보통합 로드맵, 회계(에듀파인) 전환, 교원 자격 및 처우개선비, 보건·안전 수칙 등 공문서 및 규정에 대해 신속하고 정확하게 답변해 드립니다.

무엇을 도와드릴까요?`,
      timestamp: '오전 09:30',
      suggestedQuestions: [
        '유·보 공통 친환경 급간식비 지원 단가 및 정산 기준은?',
        '어린이집 보조교사 처우개선비 교육청 예산 지급 절차는?',
        '영유아 법정 감염병 발생 시 등원 중지 기준 및 출석 인정 서류',
        '2025 유보통합 시범운영 기관 시설 안전 실사 체크리스트',
      ],
      referenceLaw: ['유아교육법 제21조', '영유아보육법 제34조', '세종시교육청 유보통합 지침서'],
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAiResponse = (query: string): { text: string; referenceLaw?: string[]; suggestions?: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('급식') || q.includes('간식') || q.includes('보조금')) {
      return {
        text: `【2024-2025 세종시 유·보 공통 친환경 급간식비 지원 및 정산 기준 안내】

1. 지원 대상 및 1인당 단가:
   - 관내 공·사립 유치원 및 국공립·민간 어린이집 만 3~5세 원아 전체 동일 단가 적용 (1식 기준 3,920원, 우수농축산물 추가 480원 지원)
   - 만 0~2세 영아의 경우 급식비 보전금 1인 1일 2,400원 지원 (세종시청-교육청 매칭)

2. 정산 시 필수 제출 서류:
   - 분기별 무상급식 정산서 (세종시 표준 공통 서식 제3호)
   - 지출결의서 및 카드매출전표 (식재료 구매 내역 일치 필수)
   - 친환경 농산물 공급확인서 (세종시 공공급식지원센터 발급분)

3. 행정 처리 유의사항:
   - 4분기 집행 잔액이 10만 원 이상인 경우 반납 고지서 발급 후 회계연도 내 세입 조치하여야 합니다.`,
        referenceLaw: ['세종특별자치시 학교급식 지원 조례 제5조', '2024년도 유아교육재정 집행지침'],
        suggestions: ['급식비 정산서 양식 다운로드', '영유아 알레르기 식단 관리 규정'],
      };
    } else if (q.includes('교사') || q.includes('처우') || q.includes('수당') || q.includes('자격')) {
      return {
        text: `【어린이집-유치원 교원 처우개선비 및 자격 통합 연계 안내】

1. 2024년 11월 기준 처우개선비 지급 기준:
   - 교육청 예산 직접 지원: 만 3~5세 담당 어린이집 보육교사 대상 월 150,000원 처우개선비 지원 (유치원 교원과의 격차 완화 목적)
   - 담임수당: 1인당 월 130,000원 지급 (시청 보육지원과 기지급분과 중복 수령 방지 교차검증)

2. 자격 통합 전환 로드맵:
   - 보육교사 1·2급 소지자의 유치원 정교사 2급 취득을 위한 특별학점 이수과정(세종 인근 교원대 및 국립대 위탁) 2025년 상반기 개설 예정
   - 영유아교사(가칭) 통합 자격 기준 법제화 진행 중

3. 신청 및 지급 절차:
   - 매월 15일까지 K-EduNet 교직원 관리 메뉴에서 출근일수(15일 이상) 확인 후 명부 승인 신청 → 22일 일괄 계좌 입금`,
        referenceLaw: ['유아교육법 제22조', '영유아보육법 제21조', '2025 유보통합 교원격차해소 지침'],
        suggestions: ['교원 처우개선비 신청 명부 서식', '직무연수 이수증 등록 방법'],
      };
    } else if (q.includes('감염병') || q.includes('결석') || q.includes('독감') || q.includes('등원')) {
      return {
        text: `【동절기 감염병 예방 및 등원 인정 결석 처리 규정】

1. 법정 감염병 격리 및 등원 중지 기준:
   - 인플루엔자(독감): 해열제 복용 없이 정상 체온 회복 후 24시간이 경과할 때까지 원내 등원 중지 (학교보건법 제8조 준용)
   - 노로바이러스: 증상(구토, 설사) 소실 후 48시간까지 등원 중지 권고
   - 수족구병: 구내염 병변 및 발진이 가라앉고 전염력이 없다는 의사 소견 확인 시까지

2. 출석 인정 결석 서류:
   - 의사 진단서, 소견서, 또는 질병명이 명시된 진료확인서 중 1부 제출 시 결석 기간 전체 '출석인정(출석인정결석)' 처리
   - 학부모 의견서만 제출할 경우 최대 3일까지 인정 가능 (질병결석 처리)`,
        referenceLaw: ['학교보건법 제8조', '유치원 유아 생활기록부 작성 및 관리지침'],
        suggestions: ['가정통신문 자동 초안 생성하기', '출석인정 결석 확인서 양식'],
      };
    } else {
      return {
        text: `【세종 유보통합 추진단 안내】
문의하신 『${query}』에 대해 행정 매뉴얼 및 관련 규정을 검토하였습니다.

• 세종특별자치시교육청은 2024~2025년 관내 52개 시범 기관(유치원 28개원, 어린이집 24개소)을 대상으로 선도적 통합 모델을 구축하고 있습니다.
• 본 사안은 교육청 표준 가이드라인에 따라 기관 운영위원회 심의 또는 공문 기안을 통해 절차를 진행하실 수 있습니다.
• 보다 정밀한 서식 생성이 필요하시다면 상단의 [AI 문서 작성] 탭에서 원하는 공문서 또는 가정통신문으로 즉시 변환하실 수 있습니다.`,
        referenceLaw: ['2025년도 정부 유보통합 실행 계획', '세종시교육청 영유아통합지원 기본조례'],
        suggestions: ['공문서 초안 작성하기', '관련 법령 전문 확인'],
      };
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getAiResponse(query);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        referenceLaw: response.referenceLaw,
        suggestedQuestions: response.suggestions,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto w-full h-[calc(100vh-5rem)] flex flex-col gap-4">
      {/* Header Context Banner */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
            <span className="material-symbols-outlined text-[22px]">smart_toy</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[18px] font-bold text-on-surface">AI 행정지원 스마트 챗봇</h1>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
                세종시 유보통합 특화 모델
              </span>
            </div>
            <p className="text-[12px] text-secondary">
              유아교육법·영유아보육법, 에듀파인 회계, 누리과정 보육지침 24시간 실시간 질의응답
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMessages([
              {
                id: 'msg-reset',
                sender: 'assistant',
                text: '대화가 초기화되었습니다. 새로운 질문을 입력해 주세요.',
                timestamp: '방금',
                suggestedQuestions: [
                  '유·보 공통 친환경 급간식비 지원 단가 및 정산 기준은?',
                  '어린이집 보조교사 처우개선비 교육청 예산 지급 절차는?',
                ],
              },
            ])
          }
          className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-[12px] font-semibold text-secondary flex items-center gap-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          <span>새 대화 시작</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 p-6 overflow-y-auto space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-primary text-white font-bold text-[13px]'
                  : 'bg-primary-fixed text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {msg.sender === 'user' ? 'person' : 'smart_toy'}
              </span>
            </div>

            {/* Bubble */}
            <div
              className={`max-w-2xl rounded-2xl p-4 text-[14px] leading-relaxed shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-surface-container-low text-on-surface rounded-tl-none border border-outline-variant/30'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Reference Laws */}
              {msg.referenceLaw && msg.referenceLaw.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-outline-variant/30 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-bold text-secondary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">gavel</span>
                    근거 법령:
                  </span>
                  {msg.referenceLaw.map((law, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-medium text-secondary"
                    >
                      {law}
                    </span>
                  ))}
                </div>
              )}

              {/* Suggested Questions */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-outline-variant/30 space-y-1.5">
                  <span className="text-[11px] font-semibold text-secondary block">
                    💡 추천 후속 질문:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(q)}
                        className="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-primary-fixed hover:text-primary text-[12px] font-medium text-on-surface border border-outline-variant/40 transition-colors text-left"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`text-[10px] mt-2 text-right ${
                  msg.sender === 'user' ? 'text-white/70' : 'text-outline'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </div>
            <div className="bg-surface-container-low rounded-2xl rounded-tl-none p-3.5 border border-outline-variant/30 flex items-center gap-1.5 text-secondary text-[13px]">
              <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
              <span
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: '0.15s' }}
              ></span>
              <span
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: '0.3s' }}
              ></span>
              <span className="ml-2 font-medium">세종시 유보통합 행정지침 데이터베이스 분석 중...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-md border border-outline-variant/40 flex items-center gap-2">
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="유보통합 관련 행정 업무, 규정, 보조금 정산, 양식 등에 대해 물어보세요... (Shift+Enter 줄바꿈)"
          className="flex-1 resize-none bg-transparent px-3 py-2 text-[14px] text-on-surface placeholder:text-outline focus:outline-none max-h-24 leading-relaxed"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="h-10 px-5 rounded-xl bg-primary text-white font-bold text-[13px] hover:bg-primary-container disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shrink-0"
        >
          <span>전송</span>
          <span className="material-symbols-outlined text-[16px]">send</span>
        </button>
      </div>
    </div>
  );
};
