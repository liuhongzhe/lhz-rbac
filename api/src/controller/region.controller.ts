import * as restify from 'restify';
import { InternalError } from 'restify-errors';
import * as Sequelize from 'sequelize';

import { ModelController } from './model-controller';
import { RegionModel } from '../storage/model/region.model';
import { RegionInstance } from '../storage/instance/region.instance';
import { RegionAttribute } from '../storage/attribute/region.attribute';

export class RegionController extends ModelController<RegionModel, RegionInstance, RegionAttribute> {
    constructor(protected modelName) {
        super(modelName, ['name', 'code'], [['code', 'asc']]);
    }

    findByParentId(req: restify.Request, res: restify.Response) {
        let parentId = req.params.parent_id;
        let searchText = this.getRequestSearchText(req);
        let fo: Sequelize.FindOptions<RegionAttribute> = {};
        fo = this.buildPaginationFindOptions(req, fo);
        fo.where = [];
        fo.where.push(Sequelize.and({
            parentId: parentId ? parentId : null
        }));
        if (searchText && this.likeColumns) {
            let whereItems = [];
            this.likeColumns.forEach(column => {
                let item = {};
                item[column] = { '$like': '%' + searchText + '%' }
                whereItems.push(item);
            });
            if (whereItems.length > 0) {
                fo.where.push(Sequelize.or(whereItems));
            }
        }
        fo.order = this.order;
        this.model.findAndCountAll(fo).then(ms => {
            res.send(ms);
        }).catch(e => {
            res.send(new InternalError('Find failed.' + e));
        });
    }
}