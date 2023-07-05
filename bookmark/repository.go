package bookmark

import (
	"context"
	"github.com/andtkach/gomongowebapi/models"
)

type Repository interface {
	CreateBookmark(ctx context.Context, user *models.User, bm *models.Bookmark) error
	GetBookmarks(ctx context.Context, user *models.User) ([]*models.Bookmark, error)
	DeleteBookmark(ctx context.Context, user *models.User, id string) error
}
