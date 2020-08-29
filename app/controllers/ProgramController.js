'use strict';
const PugView = use('app/helpers/pug-view');
const ProgramHelper = use('app/helpers/program-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Program() { }
module.exports = Program;

/**
 * Index route
 */
Program.index = async function index(req, res, next) {
    const pageRoute = 'program.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department
    });
};
/**
 * paginate route
 */
Program.paginateProgram = function paginateProgram(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ProgramHelper.loadAllProgramCountData(req)
        .then(data => {
            let count = data.data;

            ProgramHelper.loadAllProgramData(req, dataPaginate)
                .then(data => {
                    const result = {
                        success: true,
                        data: {
                            data: data,
                            count: count
                        }
                    };

                    res.status(200)
                        .send(result)
                        .end();
                })
                .catch(err => {
                    Logger.error(err);

                    res.status(500)
                        .send(err)
                        .end();
                });
        })
        .catch(err => {
            Logger.error(err);

            res.status(500)
                .send(err)
                .end();
        });
};

/**
 * show route
 */
/**
 * load data with id
 */
Program.show = async function show(req, res, next) {
    const Id = req.params.program;

    ProgramHelper.loadProgramData(Id)

        .then(data => {
            const result = {
                success: true,
                data: {
                    data: data,
                }
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * delete data dep cat
 */
Program.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ProgramHelper.deleteProgramData(data)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * Create route return page
 */
Program.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('program.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Program.store = async function store(req, res, next) {
    const files = req.files || [];

    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);

            const tempFileData = {
                file_id: data[0]._id,
                deleted_at: null
            };
            fileList.push(tempFileData);

        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList
    };

    ProgramHelper.insertNewProgram(data)
        .then(dataRes => {
            const result = {
                success: true,
                data: dataRes
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};
