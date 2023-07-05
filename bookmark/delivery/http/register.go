package http

import (
	"github.com/andtkach/gomongowebapi/bookmark"
	"github.com/gin-gonic/gin"
)

func RegisterHTTPEndpoints(router *gin.RouterGroup, uc bookmark.UseCase) {
	h := NewHandler(uc)

	bookmarks := router.Group("/bookmarks")
	{
		bookmarks.POST("", h.Create)
		bookmarks.GET("", h.Get)
		bookmarks.GET(":id", h.GetOne)
		bookmarks.PUT("", h.Update)
		bookmarks.DELETE("", h.Delete)
	}
}
