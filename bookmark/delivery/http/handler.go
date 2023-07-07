package http

import (
	"net/http"

	"github.com/andtkach/gomongowebapi/auth"
	"github.com/andtkach/gomongowebapi/bookmark"
	"github.com/andtkach/gomongowebapi/models"
	"github.com/gin-gonic/gin"
)

type Bookmark struct {
	ID    string `json:"id"`
	URL   string `json:"url"`
	Title string `json:"title"`
}

type Handler struct {
	useCase bookmark.UseCase
}

func NewHandler(useCase bookmark.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

type createInput struct {
	URL   string `json:"url"`
	Title string `json:"title"`
}

type createResponse struct {
	ID string `json:"id"`
}

func (h *Handler) Create(c *gin.Context) {
	inp := new(createInput)
	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	user := c.MustGet(auth.CtxUserKey).(*models.User)

	id, err := h.useCase.CreateBookmark(c.Request.Context(), user, inp.URL, inp.Title)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, &createResponse{
		ID: id,
	})
}

type getResponse struct {
	Bookmarks []*Bookmark `json:"bookmarks"`
}

func (h *Handler) Get(c *gin.Context) {
	user := c.MustGet(auth.CtxUserKey).(*models.User)

	bms, err := h.useCase.GetBookmarks(c.Request.Context(), user)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, &getResponse{
		Bookmarks: toBookmarks(bms),
	})
}

type getOneInput struct {
	ID string `json:"id"`
}

type getOneResponse struct {
	Bookmark *Bookmark `json:"bookmark"`
}

func (h *Handler) GetOne(c *gin.Context) {

	id := c.Param("id")

	user := c.MustGet(auth.CtxUserKey).(*models.User)

	bm, err := h.useCase.GetBookmark(c.Request.Context(), user, id)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.JSON(http.StatusOK, &getOneResponse{
		Bookmark: toBookmark(bm),
	})
}

type deleteInput struct {
	ID string `json:"id"`
}

func (h *Handler) Delete(c *gin.Context) {
	inp := new(deleteInput)
	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	user := c.MustGet(auth.CtxUserKey).(*models.User)

	if err := h.useCase.DeleteBookmark(c.Request.Context(), user, inp.ID); err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

type updateInput struct {
	ID    string `json:"id"`
	URL   string `json:"url"`
	Title string `json:"title"`
}

func (h *Handler) Update(c *gin.Context) {
	inp := new(updateInput)
	if err := c.BindJSON(inp); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	user := c.MustGet(auth.CtxUserKey).(*models.User)

	if err := h.useCase.UpdateBookmark(c.Request.Context(), user, inp.ID, inp.URL, inp.Title); err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	c.Status(http.StatusOK)
}

func toBookmarks(bs []*models.Bookmark) []*Bookmark {
	out := make([]*Bookmark, len(bs))

	for i, b := range bs {
		out[i] = toBookmark(b)
	}

	return out
}

func toBookmark(b *models.Bookmark) *Bookmark {
	return &Bookmark{
		ID:    b.ID,
		URL:   b.URL,
		Title: b.Title,
	}
}
