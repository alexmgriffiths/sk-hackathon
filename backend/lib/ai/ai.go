package ai

import (
	"context"

	"github.com/anthropics/anthropic-sdk-go"
)

type Client struct {
	inner anthropic.Client
}

func NewClient() *Client {
	return &Client{
		inner: anthropic.NewClient(),
	}
}

func (c *Client) Message(ctx context.Context, system string, userMsg string) (string, error) {
	resp, err := c.inner.Messages.New(ctx, anthropic.MessageNewParams{
		Model:     anthropic.ModelClaudeSonnet4_5_20250929,
		MaxTokens: 1024,
		System: []anthropic.TextBlockParam{
			{Text: system},
		},
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(
				anthropic.NewTextBlock(userMsg),
			),
		},
	})
	if err != nil {
		return "", err
	}

	for _, block := range resp.Content {
		if block.Type == "text" {
			return block.Text, nil
		}
	}

	return "", nil
}
