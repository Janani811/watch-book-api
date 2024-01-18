import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  async getEmployees(@Request() req, @Response() res) {
    try {
      const { employees } = await this.employeesService.fetchEmployees(req.user.us_org_id);
      res.status(200).json({
        status: true,
        employees,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  @Post()
  async addEmployee(@Body() dto, @Request() req, @Response() res) {
    try {
      await this.employeesService.addEmployees(dto);
      return res.json({ status: 200, message: 'Signup Successfully completed' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
