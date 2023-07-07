package usecase

import (
	"context"

	"github.com/andtkach/gomongowebapi/bookmark"
	"github.com/andtkach/gomongowebapi/models"
)

type BookmarkUseCase struct {
	bookmarkRepo bookmark.Repository
}

func NewBookmarkUseCase(bookmarkRepo bookmark.Repository) *BookmarkUseCase {
	return &BookmarkUseCase{
		bookmarkRepo: bookmarkRepo,
	}
}

func (b BookmarkUseCase) CreateBookmark(ctx context.Context, user *models.User, url, title string) (string, error) {
	bm := &models.Bookmark{
		URL:   url,
		Title: title,
	}

	return b.bookmarkRepo.CreateBookmark(ctx, user, bm)
}

func (b BookmarkUseCase) GetBookmarks(ctx context.Context, user *models.User) ([]*models.Bookmark, error) {
	return b.bookmarkRepo.GetBookmarks(ctx, user)
}

func (b BookmarkUseCase) GetBookmark(ctx context.Context, user *models.User, id string) (*models.Bookmark, error) {
	return b.bookmarkRepo.GetBookmark(ctx, user, id)
}

func (b BookmarkUseCase) UpdateBookmark(ctx context.Context, user *models.User, id, url, title string) error {
	bm := &models.Bookmark{
		ID:    id,
		URL:   url,
		Title: title,
	}

	return b.bookmarkRepo.UpdateBookmark(ctx, user, bm)
}

func (b BookmarkUseCase) DeleteBookmark(ctx context.Context, user *models.User, id string) error {
	return b.bookmarkRepo.DeleteBookmark(ctx, user, id)
}
