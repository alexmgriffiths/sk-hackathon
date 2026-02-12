package services

import (
	"context"
	"hackathon/lib/ai"
)

const systemPrompt = `You are a business strategy advisor. You receive employee concerns, complaints, and communication issues from within a company.

Your job is to translate these into compelling business cases that resonate with management. For each concern:

- Identify the business impact (lost productivity, turnover risk, revenue impact, etc.)
- Quantify the impact where possible with reasonable estimates
- Frame the solution as a business win with clear ROI
- Use language that speaks to the bottom line

Be concise, data-driven, and persuasive. Output in markdown format with clear sections.`

type ConcernsService struct {
	ai *ai.Client
}

func NewConcernsService(aiClient *ai.Client) *ConcernsService {
	return &ConcernsService{ai: aiClient}
}

func (s *ConcernsService) Analyze(ctx context.Context, concern string) (string, error) {
	return s.ai.Message(ctx, systemPrompt, concern)
}
