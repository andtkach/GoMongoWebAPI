package bookmark

import (
	"context"

	"github.com/andtkach/gomongowebapi/models"
)

type UseCase interface {
	CreateBookmark(ctx context.Context, user *models.User, url, title string) (string, error)
	GetBookmarks(ctx context.Context, user *models.User) ([]*models.Bookmark, error)
	GetBookmark(ctx context.Context, user *models.User, id string) (*models.Bookmark, error)
	UpdateBookmark(ctx context.Context, user *models.User, id, url, title string) error
	DeleteBookmark(ctx context.Context, user *models.User, id string) error
}
