package bookmark

import (
	"context"

	"github.com/andtkach/gomongowebapi/models"
)

type Repository interface {
	CreateBookmark(ctx context.Context, user *models.User, bm *models.Bookmark) (string, error)
	GetBookmarks(ctx context.Context, user *models.User) ([]*models.Bookmark, error)
	GetBookmark(ctx context.Context, user *models.User, id string) (*models.Bookmark, error)
	UpdateBookmark(ctx context.Context, user *models.User, bm *models.Bookmark) error
	DeleteBookmark(ctx context.Context, user *models.User, id string) error
}
