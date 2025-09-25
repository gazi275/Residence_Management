/**
 * @openapi
 * /issuereport:
 *   post:
 *     summary: POST IssueReport
 *     tags:
 *       - IssueReport
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /issuereport:
 *   get:
 *     summary: Get All IssueReport
 *     tags:
 *       - IssueReport
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /issuereport/:id:
 *   get:
 *     summary: Get Single IssueReport
 *     tags:
 *       - IssueReport
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional filter parameter
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /issuereport/:id:
 *   patch:
 *     summary: PATCH IssueReport
 *     tags:
 *       - IssueReport
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 * @openapi
 * /issuereport/:id:
 *   delete:
 *     summary: DELETE IssueReport
 *     tags:
 *       - IssueReport
 *     responses:
 *       200:
 *         description: Success
 */
