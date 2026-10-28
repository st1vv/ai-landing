export const video = () => {
	return app.gulp.src(app.path.src.video)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "VIDEO",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.newer(app.path.build.video))
		.pipe(app.gulp.dest(app.path.build.video))
}
